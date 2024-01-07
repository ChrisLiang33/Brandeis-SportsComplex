var express = require("express");
var router = express.Router();
const userRoute=require("./userRoute")


// home page to all has get and post methods
router.get("/", function (req, res, next) {
  res.render("index");
});
router.use("/users", userRoute);
router.get("/home", function (req, res, next) {
  res.render("index");
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/contact", function (req, res, next) {
  res.render("contact");
});

router.get("/membership", function (req, res, next) {
  res.render("membership");
});

router.get("/locations", function (req, res, next) {
  res.render("locations");
});

router.get("/facilities", function (req, res, next) {
  res.render("facilities");
});

router.get("/programs", function (req, res, next) {
  res.render("programs");
});

router.get("/activities", function (req, res, next) {
  res.render("activities");
});

router.get("/sponsor", function (req, res, next) {
  res.render("sponsor");
});

router.post("/membershipSuccess", function(req, res, next) {
  res.render("membershipSuccess", {name: req.body.firstName});
});

router.post("/contactsuccess", function(req, res, next) {
  res.render("contactsuccess", {name: req.body.name});
});


module.exports = router;
