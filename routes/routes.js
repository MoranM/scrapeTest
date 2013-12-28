module.exports = function (app, passport) {
	
	var routes = require('../routes');
	var user = require('../routes/user');
	var scraper = require('../lib/scraper');


	app.get('/', function(req,res){
		res.send('Hello Anonymous user.') ;
	});
	
	app.post('/login', passport.authenticate('local-login',{ session: false }), function(req, res){
		res.send('ok');
	});

	app.post('/signup', passport.authenticate('local-signup',{ session: false }), function(req, res){
		res.send('ok');
	});
	
	app.get('/scrape',isLoggedIn, scraper.scrape);


	function isLoggedIn(req, res, next){
		if (req.isAuthenticate) {
			return next();
		};

		res.redirect(401,'/');
	}
}