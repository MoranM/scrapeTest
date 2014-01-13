var cheerio = require("cheerio");
var request = require("request");
var Recipe = require("../models/recipe")();

function scrapeMako(siteUrl, callback) {
    if (!siteUrl) {
        return "could not scrape url.";
    }
    var recipe = new Recipe();

    request(siteUrl, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html, {
                ignoreWhitespace: true
            });
            var scope = $("#recipeInner") || "body";

            setTitleAndDescription($, scope);
            setInstructions($, scope);
            setIngredients($, scope)
            setImages($, scope);
            saveRecipe();
        }
    });

    function saveRecipe() {
        recipe.save(function (err) {
            if (err) {
                console.log(err);
                callback({
                    err: true,
                    message: "could not save recipe"
                });
            } else {
                callback({
                    error: false,
                    recipe: JSON.stringify(recipe)
                });
            }
        })
    }

    function setImages($, scope) {
        var image = $("div.picContainer img", scope);
        var imageUrl = image.attr("src");

        recipe.images = [imageUrl]
    }

    function setTitleAndDescription($, scope) {
        recipe.name = $('h1[itemprop=name]', scope).text().trim();
        recipe.description = $('h2[itemprop=summary]', scope).text().trim();
    }

    function setInstructions($, scope) {
        var instructions = []

        $(".recipeInstructions p", scope).children().each(function (i, elem) {
            var item = $(this).text().trim();
            if(item && item.length > 0)
                instructions.push(item);
        })

        recipe.instructionsSet = instructions;
    }

    function setIngredients($, scope) {
        var ingredients = [];

        $("ul.recipeIngredients li", scope).each(function (i, elem) {
            var item = $(this).text().trim();
            if(item && item.length > 0)
                ingredients.push(item);
        });

        recipe.ingredients = ingredients;
    }
}

exports.scrape = function (req, res) {
    var siteUrl = req.query.url;
    if (siteUrl.indexOf("mako.co.il") > 0) {
        scrapeMako(siteUrl, function (response) {
            res.json(response);
        });

    }
}