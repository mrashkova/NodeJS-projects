const Animal = require("../models/Animal");

exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find();

exports.getSingleAnimal = (animalId) => Animal.findById(animalId);

exports.update = (animalId, animalData) =>
  Animal.findByIdAndUpdate(animalId, animalData);

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.addDonations = async (animalId, userId) => {
  const animal = await this.getSingleAnimal(animalId);

  const hasDonated = animal.donation.some((d) => d?.toString() === userId);

  if (hasDonated) {
    return;
  }

  animal.donation.push(userId);
  return animal.save();
};

exports.search = async (search) => {
  let filteredAnimals = await Animal.find().lean();

  if (search) {
    filteredAnimals -
      filteredAnimals.filter((animal) =>
        animal.name.toLowerCase().includes(search.toLowerCase())
      );
  }
  return filteredAnimals;
};
