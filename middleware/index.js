var Article = require("../models/article");
var Comment = require("../models/comment");

// All middleware
var middlewareObject = {};
middlewareObject.isAuthorizedArticle = function(req, res, next){
    if(req.isAuthenticated()){
        Article.findById(req.params.id, function(err, found){
            if(err){
                req.flash("error", "Link not found.")
                res.redirect("back");
            } else {
                if(found.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You do not have permission to do that.")
                    res.redirect("back");
                }
            }
        });        
    } else {
        req.flash("error", "You must be logged in to do that!");
        res.redirect("back");
    }    
}

middlewareObject.isAuthorizedComment = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, found){
            if(err){
                res.redirect("back");
            } else {
                // User owns comment
                if(found.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash("error", "You do not have permission to do that.")
                    res.redirect("back");
                }
            }
        });        
    } else {
        req.flash("error", "You must be logged in to do that!");
        res.redirect("back");
    }    
}    

middlewareObject.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in to do that!")
    res.redirect("/login");
}

module.exports = middlewareObject;