module.exports = function (app, passport) {
	
	var scraper = require('../lib/scraper');


	app.get('/', function(req,res){
		res.send('Hello Anonymous user.') ;
	});
	
	app.post('/login', passport.authenticate('local-login',{ session: false }), function(req, res){
		res.json({
			success :req.isAuthenticate,
			token : req.apiKey
		});
	});

	app.post('/signup', passport.authenticate('local-signup',{ session: false }), function(req, res){
		res.json({
			success :req.isAuthenticate,
			token : req.apiKey
		});
	});
	
	app.get('/scrape',passport.authenticate('local-auth',{ session: false }), function(req, res){
		//scraper.scrapes
	});

}