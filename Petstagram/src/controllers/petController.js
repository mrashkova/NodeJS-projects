const router = require("express").Router();
const petService = require("../services/petService");
const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/catalog", async (req, res) => {
  const pets = await petService.getAll().lean();
  res.render("pet/catalog", { pets });
});

router.get("/create", (req, res) => {
  res.render("pet/create");
});

router.post("/create", async (req, res) => {
  const { name, age, description, location, image } = req.body;

  const payload = {
    name,
    age,
    description,
    location,
    image,
    owner: req.user,
  };

  try {
    await petService.create(payload);
    res.redirect("/pets/catalog");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("pet/create", { errorMessages });
  }
});

router.get("/:petId/details", async (req, res) => {
  const { petId } = req.params;

  const pet = await petService
    .getSinglePet(petId)
    .lean()
    .populate("commentList.user");

  const { user } = req;
  const isOwner = user?._id === req.user?._id;

  res.render("pet/details", {
    pet,
    isOwner,
  });
});

router.get("/:petId/edit", async (req, res) => {
  const { petId } = req.params;
  const pet = await petService.getSinglePet(petId).lean();

  res.render("pet/edit", { pet });
});

router.post("/:petId/edit", async (req, res) => {
  const { petId } = req.params;
  const { name, age, description, location, image } = req.body;
  const payload = {
    name,
    age,
    description,
    location,
    image,
    owner: req.user,
  };

  await petService.update(petId, payload);

  res.redirect(`/pets/${petId}/details`);
});

router.get("/:petId/delete", async (req, res) => {
  const { petId } = req.params;
  await petService.delete(petId);

  res.redirect("/pets/catalog");
});

router.get("/:petId/comment", async (req, res) => {
  const petId = req.params.petId;
  const { message } = req.body;
  const user = req.user._id;

  await petService.addComments(petId, { user, message });
  res.redirect(`/pets/${petId}/details`);
});

router.get("/profile", async (req, res) => {
  const { user } = req;
  const myPets = await petService.getMyPets(user?._id).lean();
  const petsCount = myPets.length;

  res.render("pet/profile", { myPets, petsCount });
});

module.exports = router;
