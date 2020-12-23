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
        res.redirect("/");
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
        res.redirect("/");
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
  
  app.get("/", function(req, res) {
    connection.query("SELECT * FROM garageExchnage;", function(err, data) {
      if (err) throw err;
  
      // Test it
      // console.log('The solution is: ', data);
  
      // Test it
      // return res.send(data);
  
      res.render("index", { post: data });
    });
  });
  
  // Post route -> back to home
  app.post("/", function(req, res) {
    // Test it
    // console.log('You sent, ' + req.body.task);
  
    // Test it
    // return res.send('You sent, ' + req.body.task);
  
    // When using the MySQL package, we'd use ?s in place of any values to be inserted, which are then swapped out with corresponding elements in the array
    // This helps us avoid an exploit known as SQL injection which we'd be open to if we used string concatenation
    // https://en.wikipedia.org/wiki/SQL_injection
    connection.query("INSERT INTO Post VALUES (?)", [req.body.task], function(err, result) {
      if (err) throw err;
  
      res.redirect("/");
    });
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

