const Pet = require("../models/Pet");

exports.getAll = () => Pet.find().populate("owner");

exports.create = (petData) => Pet.create(petData);

exports.getSinglePet = (petId) => Pet.findById(petId).populate("owner");

exports.update = (petId, petData) => Pet.findByIdAndUpdate(petId, petData);

exports.delete = (petId) => Pet.findByIdAndDelete(petId);

exports.addComments = async (petId, commentData) => {
  const pet = await this.getSinglePet(petId);

  pet.commentList.push(commentData);
  return pet.save();
};

exports.getMyPets = (ownerId) => Pet.find({ owner: ownerId }).populate("owner");
