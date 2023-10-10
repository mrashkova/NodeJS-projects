const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: String,
  years: Number,
  kind: String,
  need: String,
  location: String,
  description: String,
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
