


var cheerio = require("cheerio");
var request = require("request");

function scrapeYnet(siteUrl){
	if (!siteUrl) {return "could not scrape url."};

	request(siteUrl, function (error, response, html) {
	  if (!error && response.statusCode == 200) {
		    //console.log(html);

			$ = cheerio.load(html);

			var images = $('img');
			console.log(images.length);
			
			return images.html();
	  	}
	});	
}

exports.scrape = function(req, res){
	var siteUrl = req.query.url;
	res.send(scrapeYnet(siteUrl));
}