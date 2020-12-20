// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var exphbs = require("express-handlebars");
var passport = require("./config/garageExchange");
var bcrypt = require("bcryptjs");
var fs = require("fs");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// var allUsers = [
//   {
//     email: "sam@sam.org",
//     password: bcrypt.hashSync("helloworld", bcrypt.genSaltSync(10), null),
//   },
//   {
//     email: "Awa@awa.com",
//     password: bcrypt.hashSync("helloworld", bcrypt.genSaltSync(10), null),
//   },
//   {
//     email: "Paul@paul.edu",
//     password: bcrypt.hashSync("hithere", bcrypt.genSaltSync(10), null),
//   },
//   {
//     email: "Rober@robert.com",
//     password: bcrypt.hashSync("hithereall", bcrypt.genSaltSync(10), null),
//   },
// ];
// db.User.bulkCreate(allUsers, {
//   returning: true,
// })
//   .then(function (res) {
//     console.log(res);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });


// var imageData1 = fs.readFileSync(__dirname + "/pictures/imageData1.jpg");
// var imageData2 = fs.readFileSync(__dirname + "/pictures/imageData2.jpg");
// var imageData3 = fs.readFileSync(__dirname + "/pictures/imageData3.jpg");
// var imageData4 = fs.readFileSync(__dirname + "/pictures/imageData4.jpg");
// var imageData5 = fs.readFileSync(__dirname + "/pictures/imageData5.jpg");
// var imageData6 = fs.readFileSync(__dirname + "/pictures/imageData6.jpg");
// var imageData7 = fs.readFileSync(__dirname + "/pictures/imageData7.jpg");
// var imageData8 = fs.readFileSync(__dirname + "/pictures/imageData8.jpg");
// var imageData9 = fs.readFileSync(__dirname + "/pictures/imageData9.jpg");
// var imageData10 = fs.readFileSync(__dirname + "/pictures/imageData10.jpg");
// var imageData11 = fs.readFileSync(__dirname + "/pictures/imageData11.jpg");

// var allPosts = [
//   {
//     item: "Clearwater Hot Tub",
//     description:
//       "Quarantine in style ;) Hot tub hasn't been used for a while. Includes the whole setup, if desired: cover, heater, pumps. Needs to be dismantled and loaded on site. Complete with manuals and service records.",
//     picture: imageData1,
//   },
//   {
//     item: "6 cup Rice cooker",
//     description:
//       "Fully functional has a small steamer basket, measuring cup, rice paddle.",
//     picture: imageData2,
//   },
//   {
//     item: "Specialized Stumpjumper M2 Comp",
//     description:
//       "Specialized Stumpjumper M2 Comp Mountain Bike: 17 inch Frame. Original owner. Everything works great. Frame construction is TIG-welded. Frame Material is M2XMetal Matrix Ceramic Composite, butted. Front forks are Rock Shox Judy XC.",
//     picture: imageData3,
//   },
//   {
//     item: "Unicycle new condition",
//     description:
//       "Unicycle new condition has a fresh paint job and a nice new tire. Rides very good and has had very little use.",
//     picture: imageData4,
//   },
//   {
//     item: "Dinning table with 4 chairs",
//     description:
//       "Dinning table with four chairs Dinning table is very durable and heavy(granite).",
//     picture: imageData5,
//   },
//   {
//     item: "Pearl Jam poster & beer cans",
//     description:
//       "Empty Pearl Jam beer cans and poster from the 2018 Home Shows 23 x 11 newspaper poster from 2018 Home shows.",
//     picture: imageData6,
//   },
//   {
//     item: "Daisy Duck t-shirt, coffee mug, Donald Duck ring",
//     description:
//       "Donald Duck adjustable ring (size 7 or smaller), new Daisy Duck t-shirt woman's size medium, and new Daisy Duck coffee / tea mug.",
//     picture: imageData7,
//   },
//   {
//     item: "IPHONE XS MAX 256 GOLD unlocked",
//     description:
//       "Unlocked Gold (rare color) Iphone XS Max 256g comes with charger and ready to be used out of the box, only minor chip on top otherwise in perfect condition.",
//     picture: imageData8,
//   },
//   {
//     item: "1972 Columbia sailboat",
//     description:
//       "Inside and out needs some cleaning up and basic restoration. It's a 1972 columbia 26 Has mount for outboard. Sails are in the boat I believe. Currently located at the Marina at Browns Point, however the boat would have to leave the marina once gifted.",
//     picture: imageData9,
//   },
//   {
//     item: "Gorgeous tiles and bathroom sinks",
//     description:
//       "Beautiful Bizassa glass tiles. They can go indoors or out, vertically or horizontally and around corners. 19 boxes @ ~ 16 square feet per box, plus two matching bowl sinks.",
//     picture: imageData10,
//   },
//   {
//     item: "Specialized Hardrock Sport Disc",
//     description:
//       "Giving away my Specialized Hardrock Sport Disc mountain bike RST Gila suspension forks, Acera front derailleur, XTR rear. Triple crank, 8-speed cassette, 26 inch wheels, Disc brakes.",
//     picture: imageData11,
//   },
// ];
// db.Posts.bulkCreate(allPosts, {
//   returning: true,
// })
//   .then(function (res) {
//     console.log(res);
//   })
//   .catch(function (err) {
//     console.log(err);
//   });

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
