exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'http://localhost/',
	capabilities: {
		browserName: 'chrome',
	},
  specs: ['tests/stub.js']
};
