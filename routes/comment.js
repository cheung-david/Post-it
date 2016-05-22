var express = require("express");
var router  = express.Router({mergeParams: true});
var Article = require("../models/article");
var Comment = require("../models/comment");
var Middleware = require("../middleware");

// ===========================================
// COMMENTS ROUTES
// ===========================================

// Comment New
router.get("/new", Middleware.isLoggedIn, function(req, res){
    // find article by id and pass it through
    Article.findById(req.params.id, function(err, found){
        if(err){
            console.log("Error: " + err);
        } else {
            res.render("comments/new", {article: found});
        }
    });
});

// Comment Create
router.post("/", Middleware.isLoggedIn, function(req, res){
   // lookup article using ID
   Article.findById(req.params.id, function(err, found){
       if(err){
           console.log("Error: " + err);
            req.flash("error", "Someting went wrong");
           res.redirect("/articles");
       } else {
            // create new comment
           Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                   // Add username and their id to the comment, connect new comment to article
                   // redirect to show page
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   comment.date = new Date();
                   comment.save();
                   found.comments.push(comment);
                   found.save();
                   req.flash("success", "Your comment has been posted.");
                   res.redirect('/articles/' + found._id);
               }
           });
       }
   })

   
});

// EDIT comments route
router.get("/:comment_id/edit", Middleware.isAuthorizedComment, function(req,res){
    Comment.findById(req.params.comment_id, function(err, found) {
       if(err){
           res.redirect("back");
       } else {
           res.render("comments/edit", {article_id: req.params.id, comment: found});
       }
    });
});

// UPDATE comments
router.put("/:comment_id", Middleware.isAuthorizedComment, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updated){
       if(err){
           res.redirect("back");
       }  else {
           res.redirect("/articles/" + req.params.id);
       }
    });
});

// DESTROY comments route
router.delete("/:comment_id", Middleware.isAuthorizedComment, function(req, res){
    // Find comment and delete
    Comment.findByIdAndRemove(req.params.comment_id, function(err, found){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted.")
            res.redirect("/articles/" + req.params.id);
        }
    });
})


module.exports = router;