const router = require("express").Router();

router.get("/", (req, res) => {
  // res.send("Hello home page");
  res.render("home");
});

module.exports = router;
