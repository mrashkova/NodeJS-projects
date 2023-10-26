const mongoose = require("mongoose");

const electronicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [
      10,
      "The name is required and should be at least 10 characters.",
    ],
  },
  type: {
    type: String,
    required: true,
    minLength: [2, "The type is required and should be at least 2 characters."],
  },
  damages: {
    type: String,
    required: true,
    minLength: [
      10,
      "The damages is required and should be at least 10 characters.",
    ],
  },
  image: {
    type: String,
    required: true,
    match: [
      /^https?:\/\/.+/,
      "The electronic's image is required and should start with http:// or https://.",
    ],
  },
  description: {
    type: String,
    required: true,
    minLength: [
      10,
      "The description is required and should be between 10 and 200 characters.",
    ],
    maxLength: [
      200,
      "The description is required and should be between 10 and 200 characters.",
    ],
  },
  production: {
    type: Number,
    required: true,
    min: [
      1900,
      "The production is required and should be between 1900 and 2023.",
    ],
    max: [
      2023,
      "The production is required and should be between 1900 and 2023.",
    ],
  },
  exploitation: {
    type: Number,
    required: true,
    min: [0, "The exploitation should be a positive number."],
  },
  price: {
    type: Number,
    required: true,
    min: [0, "The price should be a positive number."],
  },
  buyingList: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Electronic = mongoose.model("Electronic", electronicSchema);

module.exports = Electronic;
