// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");
var posts = require("../models/post");
var multer  = require('multer');
var upload = multer({ dest: 'pictures/' });  
var path = require("path")
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../public/pictures'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+".jpg")
  }
})
 
var upload = multer({ storage: storage })

module.exports = function(app) {
  app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }

    db.Posts.create({
      item: req.body.item,
      description: req.body.description,
      picture:  file.fieldname + '-' + Date.now()+".jpg"
    })
      .then(function() {
        console.log(response)
        res.redirect(307, "/");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });

        //  res.send(file)
    
  })
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect("/");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  app.post("/api/newPost", function(req, res) {
    db.Posts.create({
      item: req.body.item,
      description: req.body.description,
      picture: req.body.picture
    })
      .then(function() {
        console.log(response)
        res.redirect(307, "/");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email
        // id: req.user.id
      });
    }
  });
};

