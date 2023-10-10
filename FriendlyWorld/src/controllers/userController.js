const router = require("express").Router();

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = router;
