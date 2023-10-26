const router = require("express").Router();
const electronicService = require("../services/electronicService");
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMsgs } = require("../utils/errorHandler");

// All
router.get("/catalog", async (req, res) => {
  const electronics = await electronicService.getAll().lean();
  // console.log({ electronics });
  res.render("electronic/catalog", { electronics });
});

// Create
router.get("/create", (req, res) => {
  res.render("electronic/create");
});

router.post("/create", async (req, res) => {
  const {
    name,
    type,
    damages,
    image,
    description,
    production,
    exploitation,
    price,
  } = req.body;
  const payload = {
    name,
    type,
    damages,
    image,
    description,
    production,
    exploitation,
    price,
    owner: req.user,
  };

  try {
    await electronicService.create(payload);
    res.redirect("/electronics/catalog");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    // console.log(errorMessages);
    res.status(404).render("electronic/create", { errorMessages });
  }
});

// Details
router.get("/:electronicId/details", async (req, res) => {
  const { electronicId } = req.params;

  const electronic = await electronicService
    .getSingleElectronic(electronicId)
    .lean();

  const { user } = req;
  const { owner } = electronic;
  const isOwner = user?._id === owner.toString();
  // console.log({ owner });
  const hasBought = electronic.buyingList?.some(
    (buyer) => buyer?.toString() === user?._id
  );

  res.render("electronic/details", {
    electronic,
    isOwner,
    hasBought,
  });
});

// Edit
router.get("/:electronicId/edit", isAuth, async (req, res) => {
  const { electronicId } = req.params;

  const electronic = await electronicService
    .getSingleElectronic(electronicId)
    .lean();

  // Routes guards
  if (electronic.owner?.toString() !== req.user._id) {
    return res.redirect("/404");
  }

  res.render("electronic/edit", { electronic });
});

router.post("/:electronicId/edit", async (req, res) => {
  const { electronicId } = req.params;
  const {
    name,
    type,
    damages,
    image,
    description,
    production,
    exploitation,
    price,
  } = req.body;

  const payload = {
    name,
    type,
    damages,
    image,
    description,
    production,
    exploitation,
    price,
    owner: req.user,
  };

  await electronicService.update(electronicId, payload);

  res.redirect(`/electronics/${electronicId}/details`);
});

// Delete
router.get("/:electronicId/delete", isAuth, async (req, res) => {
  const { electronicId } = req.params;
  await electronicService.delete(electronicId);
  // const electronic = await electronicService
  //   .getSingleElectronic(electronicId)
  //   .lean();

  // // Routes guards
  // if (electronic.owner?.toString() !== req.user._id) {
  //   return res.redirect("/404");
  // }

  res.redirect("/electronics/catalog");
});

// Buy
router.get("/:electronicId/buy", async (req, res) => {
  const { electronicId } = req.params;
  const { _id } = req.user;

  const electronic = await electronicService.buy(electronicId, _id);

  // Routes guards
  if (electronic.owner?.toString() === req.user._id) {
    return res.redirect("/404");
  }

  res.redirect(`/electronics/${electronicId}/details`);
});

// Search
router.get("/search", async (req, res) => {
  const { searchName, searchType } = req.query;
  const electronics = await electronicService.search(searchName, searchType);

  res.render("electronic/search", { electronics, searchName, searchType });
});

module.exports = router;
