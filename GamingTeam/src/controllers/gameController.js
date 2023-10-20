const router = require("express").Router();
const gameService = require("../services/gameService");
const { extractErrorMsgs } = require("../utils/errorHandler");
const { isAuth } = require("../middleware/authMiddleware");

router.get("/catalog", async (req, res) => {
  const games = await gameService.getAll().lean();
  res.render("game/catalog", { games });
});

router.get("/create", isAuth, (req, res) => {
  res.render("game/create");
});

router.post("/create", async (req, res) => {
  const { name, image, price, description, genre, platform } = req.body;
  const payload = {
    name,
    image,
    price,
    description,
    genre,
    platform,
    owner: req.user,
  };

  try {
    await gameService.create(payload);
    res.redirect("/games/catalog");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log(errorMessages);
    res.status(404).render("game/create", { errorMessages });
  }
});

router.get("/:gameId/details", async (req, res) => {
  const { gameId } = req.params;

  const game = await gameService.getSingleGame(gameId).lean();

  const { user } = req;
  const { owner } = game;
  const isOwner = user?._id === owner.toString();
  const hasBought = game.boughtBy.some((b) => b?.toString() === user?._id);

  res.render("game/details", { game, isOwner, hasBought });
});

router.get("/:gameId/edit", async (req, res) => {
  const { gameId } = req.params;
  const game = await gameService.getSingleGame(gameId).lean();

  res.render("game/edit", { game });
});

router.post("/:gameId/edit", async (req, res) => {
  const { gameId } = req.params;
  const { name, image, price, description, genre, platform } = req.body;
  const payload = {
    name,
    image,
    price,
    description,
    genre,
    platform,
    owner: req.user,
  };

  await gameService.update(gameId, payload);

  res.redirect(`/games/${gameId}/details`);
});

router.get("/:gameId/delete", async (req, res) => {
  const { gameId } = req.params;
  await gameService.delete(gameId);

  res.redirect("/games/catalog");
});

router.get("/:gameId/buy", async (req, res) => {
  const { gameId } = req.params;
  const { _id } = req.user;

  await gameService.addBoughtBy(gameId, _id);

  res.redirect(`/games/${gameId}/details`);
});

router.get("/search", (req, res) => {
  res.render("game/search");
});

module.exports = router;
