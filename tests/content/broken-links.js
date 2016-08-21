'use strict';
describe('Broken links', () => {

	const blc = require('broken-link-checker');

	it('should not exist', (done) => {
		let htmlChecker = new blc.HtmlChecker({
			filterLevel: 3, // check everything
			userAgent: browser.crawler.userAgent
		}, {
			link: result => {
				let failReason = `${blc[result.brokenReason]} for ${result.url.original}`;
				expect(result.broken).toBe(false, failReason);
			},
			complete: done
		});
		htmlChecker.scan(browser.crawler.contents, browser.crawler.baseUrl);
	});

});
