const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    reqruired: true,
    minLength: [2, "The name is required and should be at least 2 characters"],
  },
  age: {
    type: Number,
    required: true,
    min: [
      1,
      "The age is required and should be at least 1 and no longer than 100 characters.",
    ],
    max: [
      100,
      "The age is required and should be at least 1 and no longer than 100 characters.",
    ],
  },
  description: {
    type: String,
    required: true,
    minLength: [
      5,
      "The description is required and should be at least 5 and no longer than 50 characters",
    ],
    maxLength: [
      50,
      "The description is required and should be at least 5 and no longer than 50 characters",
    ],
  },
  location: {
    type: String,
    required: true,
    minLength: [
      5,
      "The location is required and should be at least 5 and no longer than 50 characters.",
    ],
    maxLength: [
      50,
      "The location is required and should be at least 5 and no longer than 50 characters.",
    ],
  },
  image: {
    type: String,
    required: true,
    match: [
      /^https?:\/\/.+/,
      "The photo image is required and should start with http:// or https://",
    ],
  },
  commentList: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      message: {
        type: String,
        required: [true, "Comment message is required."],
      },
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
