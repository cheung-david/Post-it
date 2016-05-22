var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Article = require("../models/article");

// Index
router.get("/", function(req, res){
    // Retrieve all articles from database
    Article.find({}, function(err, allArticles){
       if(err){
           console.log("Error: " + err);
       } else {
           res.render("landing", {articles:allArticles, query:req.query});
       }
    });
});

// ===============
// Authentication
// ===============

// Show register form
router.get("/register", function(req, res) {
    res.render("register");
});

// create new user
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
           req.flash("error", err.message);
           console.log("Error: " + err);
           return res.render("register")
       } 
       passport.authenticate("local")(req, res, function(){
          req.flash("success", "Welcome " + user.username + "!");
          res.redirect("/articles"); 
       });
    });
});

// Show login form
router.get("/login", function(req,res){
    res.render("login");
});

// login authentication
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/articles",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: "Welcome back!"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "You have been logged out.");
   res.redirect("/articles");
});

module.exports = router;