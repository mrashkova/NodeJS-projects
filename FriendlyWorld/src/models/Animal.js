const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "The name is required and should be at least 2 characters."],
  },
  years: {
    type: Number,
    required: true,
    // min: [
    //   1,
    //   "The years are required and should be a number between 1 and 100.",
    // ],
    // max: [
    //   1,
    //   "The years are required and should be a number between 1 and 100.",
    // ],
  },
  kind: {
    type: String,
    required: true,
    minLength: [3, "The kind is required and should be at least 3 characters."],
  },
  image: {
    type: String,
    required: true,
    match: [
      /^https?:\/\/.+/,
      "The photo image is required and should start with http:// or https://",
    ],
  },
  need: {
    type: String,
    required: true,
    minLength: [
      3,
      "The need is required and should be at least 3 and no longer than 20 characters.",
    ],
    maxLength: [
      20,
      "The need is required and should be at least 3 and no longer than 20 characters.",
    ],
  },
  location: {
    type: String,
    required: true,
    minLength: [
      5,
      "The location is required and should be at least 5 and no longer than 15 characters.",
    ],
    maxLength: [
      15,
      "The location is required and should be at least 5 and no longer than 15 characters.",
    ],
  },
  description: {
    type: String,
    required: true,
    minLength: [
      5,
      "The description is required and should be at least 5 and no longer than 50 characters.",
    ],
    maxLength: [
      50,
      "The description is required and should be at least 5 and no longer than 50 characters.",
    ],
  },
  donation: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  owner: { type: mongoose.Types.ObjectId, ref: "User" },
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
