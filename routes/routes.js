module.exports = function (app, passport) {
	
	var routes = require('../routes');
	var user = require('../routes/user');
	var scraper = require('../lib/scraper');


	app.get('/', routes.index);
	
	app.get('/users', user.list);
	
	app.get('/scrape', scraper.scrape);

}