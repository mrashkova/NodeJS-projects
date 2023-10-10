const router = require("express").Router();

router.get("/create", (req, res) => {
  res.render("animal/create");
});

router.get("/:animalId/details", (req, res) => {
  res.render("animal/details");
});

module.exports = router;
