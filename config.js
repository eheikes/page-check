'use strict';

const pkg = require('./package.json');

exports.config = {
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	baseUrl: 'http://localhost/',
	capabilities: {
		browserName: 'chrome',
	},
	onPrepare: function() {
		function setUpData() {
			browser.crawler = {};
			return Promise.resolve(browser.crawler);
		}

		function getProtractorConfig() {
			return browser.getProcessedConfig().then(config => {
				browser.crawler.baseUrl = config.baseUrl;
				return config;
			});
		}

		function requestPage() {
			browser.ignoreSynchronization = true;
			return browser.get(browser.crawler.baseUrl);
		}

		function saveHtml() {
			return $('html').getOuterHtml().then(html => {
				browser.crawler.contents = html;
				return html;
			});
		}

		function createUserAgent() {
			browser.crawler.userAgent = `${pkg.name}/${pkg.version} (${pkg.homepage})`;
			return Promise.resolve(browser.crawler.userAgent);
		}

		return setUpData()
			.then(getProtractorConfig)
			.then(createUserAgent)
			.then(requestPage)
			.then(saveHtml)
			.catch(err => {
				console.error(`ERROR!: ${err}`);
			});
	},
	specs: ['tests/**/*.js'],
	suites: {
		accessibility: 'tests/a11y/*.js',
		content: 'tests/content/*.js',
		performance: 'tests/perf/*.js',
		security: 'tests/security/*.js'
	}
};
