const router = require("express").Router();

router.get("/catalog", (req, res) => {
  res.render("game/catalog");
});

router.get("/create", (req, res) => {
  res.render("game/create");
});

router.get("/search", (req, res) => {
  res.render("game/search");
});

module.exports = router;
