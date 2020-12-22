// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var fs = require("fs");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

var imageData1 = "/pictures/imageData1.jpg";
var imageData2 = "/pictures/imageData2.jpg"
var imageData3 = "/pictures/imageData3.jpg"
var imageData4 = "/pictures/imageData4.jpg"
var imageData5 = "/pictures/imageData5.jpg"
var imageData6 = "/pictures/imageData6.jpg"
var imageData7 = "/pictures/imageData7.jpg"
var imageData8 = "/pictures/imageData8.jpg"
var imageData9 = "/pictures/imageData9.jpg"
var imageData10 = "/pictures/imageData10.jpg"
var imageData11 = "/pictures/imageData11.jpg"

var allPosts = [
  {
    item: "Clearwater Hot Tub",
    description:
      "Quarantine in style ;) Hot tub hasn't been used for a while. Includes the whole setup, if desired: cover, heater, pumps. Needs to be dismantled and loaded on site. Complete with manuals and service records.",
    picture: imageData1,
  },
  {
    item: "6 cup Rice cooker",
    description:
      "Fully functional has a small steamer basket, measuring cup, rice paddle.",
    picture: imageData2,
  },
  {
    item: "Specialized Stumpjumper M2 Comp",
    description:
      "Specialized Stumpjumper M2 Comp Mountain Bike: 17 inch Frame. Original owner. Everything works great. Frame construction is TIG-welded. Frame Material is M2XMetal Matrix Ceramic Composite, butted. Front forks are Rock Shox Judy XC.",
    picture: imageData3,
  },
  {
    item: "Unicycle new condition",
    description:
      "Unicycle new condition has a fresh paint job and a nice new tire. Rides very good and has had very little use.",
    picture: imageData4,
  },
  {
    item: "Dinning table with 4 chairs",
    description:
      "Dinning table with four chairs Dinning table is very durable and heavy(granite).",
    picture: imageData5,
  },
  {
    item: "Pearl Jam poster & beer cans",
    description:
      "Empty Pearl Jam beer cans and poster from the 2018 Home Shows 23 x 11 newspaper poster from 2018 Home shows.",
    picture: imageData6,
  },
  {
    item: "Daisy Duck t-shirt, coffee mug, Donald Duck ring",
    description:
      "Donald Duck adjustable ring (size 7 or smaller), new Daisy Duck t-shirt woman's size medium, and new Daisy Duck coffee / tea mug.",
    picture: imageData7,
  },
  {
    item: "IPHONE XS MAX 256 GOLD unlocked",
    description:
      "Unlocked Gold (rare color) Iphone XS Max 256g comes with charger and ready to be used out of the box, only minor chip on top otherwise in perfect condition.",
    picture: imageData8,
  },
  {
    item: "1972 Columbia sailboat",
    description:
      "Inside and out needs some cleaning up and basic restoration. It's a 1972 columbia 26 Has mount for outboard. Sails are in the boat I believe. Currently located at the Marina at Browns Point, however the boat would have to leave the marina once gifted.",
    picture: imageData9,
  },
  {
    item: "Gorgeous tiles and bathroom sinks",
    description:
      "Beautiful Bizassa glass tiles. They can go indoors or out, vertically or horizontally and around corners. 19 boxes @ ~ 16 square feet per box, plus two matching bowl sinks.",
    picture: imageData10,
  },
  {
    item: "Specialized Hardrock Sport Disc",
    description:
      "Giving away my Specialized Hardrock Sport Disc mountain bike RST Gila suspension forks, Acera front derailleur, XTR rear. Triple crank, 8-speed cassette, 26 inch wheels, Disc brakes.",
    picture: imageData11,
  }
];

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("index", {posts:allPosts});
  });

   app.get("/signup", function(req, res) {
    // // If the user already has an account send them to the members page
    // if (req.user) {
    //   res.redirect("/members");
    // }
    res.render("signup");
  });

  app.get("/login", function(req, res) {
      res.render("login");
  });

  app.get("/post", function(req, res) {
     res.render("post");
  });

  app.get("/api/search", function(req, res) {
    res.json(allPosts);
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"))
  });

};
