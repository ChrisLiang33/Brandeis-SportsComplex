const router = require("express").Router();
//routes for pages on the navbar
router.get("/", (req, res) => {
  res.render("home.ejs");
});
router.get("/about", (req, res) => {
  res.render("about.ejs");
});
router.get("/contact", (req, res) => {
  res.render("contact.ejs");
});
router.get("/events", (req, res) => {
  res.render("events.ejs");
});
router.get("/thankyou", (req, res) => {
  res.render("thankyou.ejs");
});
module.exports = router;
