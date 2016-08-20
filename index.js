#!/usr/bin/env node
'use strict';

const Promise = require('bluebird');

const path = require('path');
const selenium = Promise.promisifyAll(require('selenium-standalone'));
const spawn = require('child_process').spawn;

// Installs and starts the Selenium server.
// Automatically closes the server when finished.
function startSelenium() {
	console.log('Starting Selenium...');
	return selenium.installAsync().then(selenium.startAsync).disposer(process => {
		if (process) {
			console.log('Stopping Selenium...');
			process.kill();
		}
	});
}

// Starts the Protractor process and runs the test suite.
function runTests() {
	console.log('Running tests...');
	let cmd = process.platform === 'win32' ? 'protractor.cmd' : 'protractor';
	let fullCmd = path.join('node_modules', '.bin', cmd);
	let args = ['config.js'];
	let ptor = spawn(fullCmd, args);
	ptor.stdout.on('data', data => console.log(data.toString()));
	ptor.stderr.on('data', data => console.log(data.toString()));
	return new Promise((resolve, reject) => {
		ptor.on('close', resolve);
		ptor.on('error', reject);
	});
}

// Start the main process.
Promise.using(startSelenium(), runTests).then(() => {
	console.log('All done.');
}).catch(err => {
	console.error(`ERROR: ${err}`);
});
