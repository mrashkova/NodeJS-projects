const router = require("express").Router();
const creatureService = require("../services/creatureService");

router.get("/all", async (req, res) => {
  const creatures = await creatureService.getAll().lean();
  console.log({ creatures });

  res.render("post/all-posts", { creatures });
});

router.get("/create", (req, res) => {
  res.render("post/create");
});

router.post("/create", async (req, res) => {
  const { name, species, skinColor, eyeColor, image, description } = req.body;

  await creatureService.create({
    name,
    species,
    skinColor,
    eyeColor,
    image,
    description,
    owner: req.user._id,
  });

  res.redirect("/posts/all");
});

router.get("/profile", (req, res) => {
  res.render("post/profile");
});

router.get("/:creatureId/details", async (req, res) => {
  const { creatureId } = req.params;

  const creature = await creatureService.singleCreature(creatureId).lean();

  const { user } = req;
  console.log({ user });
  const { owner } = creature;
  console.log({ owner });
  const isOwner = user._id === owner.toString();
  console.log({ isOwner });
  res.render("post/details", { creature });
});

module.exports = router;
