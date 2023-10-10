const Animal = require("../models/Animal");

exports.create = async (animalData) => {
  const animal = await Animal.create(animalData);
  return animal;
};
