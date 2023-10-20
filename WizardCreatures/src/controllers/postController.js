const router = require("express").Router();
const creatureService = require("../services/creatureService");
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/all", async (req, res) => {
  const creatures = await creatureService.getAll().lean();
  // console.log({ creatures });

  res.render("post/all-posts", { creatures });
});

router.get("/create", isAuth, (req, res) => {
  res.render("post/create");
});

router.post("/create", async (req, res) => {
  const { name, species, skinColor, eyeColor, image, description } = req.body;
  // console.log(req.user);
  const payload = {
    name,
    species,
    skinColor,
    eyeColor,
    image,
    description,
    owner: req.user,
  };

  try {
    await creatureService.create(payload);
    res.redirect("/posts/all");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    // console.log(errorMessages);
    res.status(404).render("post/create", { errorMessages });
  }
});

router.get("/profile", isAuth, async (req, res) => {
  const { user } = req;

  const myCreatures = await creatureService.getMyCreatures(user?._id).lean();

  res.render("post/profile", { myCreatures });
});

router.get("/:creatureId/details", isAuth, async (req, res) => {
  const { creatureId } = req.params;

  const creature = await creatureService.getSingleCreature(creatureId).lean();

  const { user } = req;
  const { owner } = creature;
  const isOwner = user?._id === owner.toString();
  console.log({ owner });
  const hasVoted = creature.votes?.some((v) => v?.toString() === user?._id);
  const joinedEmailsOfOwners = creature.votes.map((v) => v.email).join(", ");
  // console.log({ votes: creature.votes[0].email });
  res.render("post/details", {
    creature,
    isOwner,
    hasVoted,
    joinedEmailsOfOwners,
  });
});

router.get("/:creatureId/edit", isAuth, async (req, res) => {
  const { creatureId } = req.params;
  const creature = await creatureService.getSingleCreature(creatureId).lean();

  res.render("post/edit", { creature });
});

router.post("/:creatureId/edit", async (req, res) => {
  const { creatureId } = req.params;
  const { name, species, skinColor, eyeColor, image, description } = req.body;
  // console.log(req.user);
  const payload = {
    name,
    species,
    skinColor,
    eyeColor,
    image,
    description,
    owner: req.user,
  };
  await creatureService.update(creatureId, payload);

  res.redirect(`/posts/${creatureId}/details`);
});

router.get("/:creatureId/delete", async (req, res) => {
  const { creatureId } = req.params;
  await creatureService.delete(creatureId);

  res.redirect("/posts/all");
});

router.get("/:creatureId/vote", async (req, res) => {
  const { creatureId } = req.params;
  const { _id } = req.user;

  await creatureService.addVotes(creatureId, _id);

  res.redirect(`/posts/${creatureId}/details`);
});

module.exports = router;
