const router = require("express").Router();
const animalService = require("../services/animalService");
const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/dashboard", async (req, res) => {
  const animals = await animalService.getAll().lean();

  res.render("animal/dashboard", { animals });
});

router.get("/search", async (req, res) => {
  const { search } = req.query;
  const animals = await animalService.search(search);

  res.render("animal/search", { animals, search });
});

router.get("/create", (req, res) => {
  res.render("animal/create");
});

router.post("/create", async (req, res) => {
  const { name, years, kind, image, need, location, description } = req.body;
  const payload = {
    name,
    years,
    kind,
    image,
    need,
    location,
    description,
    owner: req.user,
  };

  try {
    await animalService.create(payload);
    res.redirect("/animals/dashboard");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("animal/create", { errorMessages });
  }
});

router.get("/:animalId/details", async (req, res) => {
  const { animalId } = req.params;
  const animal = await animalService.getSingleAnimal(animalId).lean();

  const { user } = req;
  const { owner } = animal;
  const isOwner = user?._id === owner.toString();
  const hasDonated = animal.donation?.some((d) => d?.toString() === user?._id);

  res.render("animal/details", {
    animal,
    isOwner,
    hasDonated,
  });
  console.log(animal);
});

router.get("/:animalId/edit", async (req, res) => {
  const { animalId } = req.params;
  const animal = await animalService.getSingleAnimal(animalId).lean();

  res.render("animal/edit", { animal });
});

router.post("/:animalId/edit", async (req, res) => {
  const { animalId } = req.params;
  const { name, years, kind, image, need, location, description } = req.body;
  const payload = {
    name,
    years,
    kind,
    image,
    need,
    location,
    description,
    owner: req.user,
  };

  await animalService.update(animalId, payload);
  res.redirect(`/animals/${animalId}/details`);
});

router.get("/:animalId/delete", async (req, res) => {
  const { animalId } = req.params;
  await animalService.delete(animalId);

  res.redirect("/animals/dashboard");
});

router.get("/:animalId/donation", async (req, res) => {
  const { animalId } = req.params;
  const { _id } = req.user;

  await animalService.addDonations(animalId, _id);

  res.redirect(`/animals/${animalId}/details`);
});

module.exports = router;
