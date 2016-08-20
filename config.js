exports.config = {
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	baseUrl: 'http://localhost/',
	capabilities: {
		browserName: 'chrome',
	},
	onPrepare: function() {
		return browser.getProcessedConfig().then(config => {
			return browser.driver.get(config.baseUrl);
		}).catch(err => console.error.bind(console.error));
	},
	specs: ['tests/**/*.js'],
	suites: {
		accessibility: 'tests/a11y/*.js',
		content: 'tests/content/*.js',
		performance: 'tests/perf/*.js',
		security: 'tests/security/*.js'
  }
};
