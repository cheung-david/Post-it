var express = require("express");
var router  = express.Router();
var Article = require("../models/article");
var Middleware = require("../middleware");


// INDEX - show all articles
router.get("/", function(req, res) {
    // Retrive all articles from database
    Article.find({}, function(err, allArticles){
       if(err){
           console.log("Error: " + err);
       } else {
           res.render("articles/index", {articles:allArticles, query:req.query});
       }
    });
});


// NEW - page to add new articles
router.get("/new", Middleware.isLoggedIn, function(req, res) {
   res.render("articles/new");
});


// SHOW - display more info about a specific article
router.get("/:id", function(req, res) {
    // Find article with the specific id and display it
    Article.findById(req.params.id).populate("comments").exec(function(err, found){
        if(err){
            console.log("Error: " + err)
        } else {
            res.render("articles/show", {article: found});
        }
    });
});

// CREATE - add new article to DB
router.post("/", Middleware.isLoggedIn, function(req, res){
    // Get data from form and create object for an article
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newArticle = {name: name, image: image, description: desc, author: author};
    
    // Save article to database
    Article.create(newArticle, function(err, created){
       if(err){
           console.log("Error: " + err);
       } else {
           res.redirect("/articles");
       }
    });
});

// EDIT ROUTE
router.get("/:id/edit", Middleware.isAuthorizedArticle, function(req, res) {
        Article.findById(req.params.id, function(err, found){
            if(err){
                 req.flash("error", "The page does not exist.");
            }
                res.render("articles/edit", {article: found});
        });        
});
    


// UPDATE ROUTE
router.put("/:id", Middleware.isAuthorizedArticle, function(req, res) {
    // find and update article
    Article.findByIdAndUpdate(req.params.id, req.body.article, function(err, updated){
       if(err){
           res.redirect("/articles");
       } else {
           res.redirect("/articles/" + req.params.id);
       }
    });
    // redirect
});


// DESTROY ROUTE
router.delete("/:id", Middleware.isAuthorizedArticle, function(req, res){
    Article.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/articles");
        } else {
            req.flash("success", "Post deleted.");
            res.redirect("/articles");
        }
    })
});



module.exports = router;