const router = require("express").Router();

router.get("/", (req, res) => {
  // res.send("Hello home page");
  res.render("home");
});

router.get("/404", (req, res) => {
  // res.send("Hello home page");
  res.render("404");
});

module.exports = router;
