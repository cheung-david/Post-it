var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    Article         = require("./models/article"),
    seedDB          = require("./seeds"),
    Comment         = require("./models/comment"),
    passport        = require("passport"),
    localStrategy   = require("passport-local"),
    User            = require("./models/user"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash");
    
// Required routes
var indexRoutes         = require("./routes/index"),
    articleRoutes       = require("./routes/articles"),
    commentRoutes       = require("./routes/comment");

mongoose.connect(process.env.DATABASEURL);

// Configurations
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
// Seed database with initial data
// seedDB();

// Passport setup
app.use(require("express-session")({
    secret: "This is a random salt that I will use here for demo purposes",
    resave: false,
    saveUninitialized: false
}));

// Passport authentication setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware, makes current user visible to all other pages
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// Routes to different sections
app.use("/articles/:id/comments", commentRoutes);
app.use("/articles", articleRoutes);
app.use("/", indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The server has started!!!");
});