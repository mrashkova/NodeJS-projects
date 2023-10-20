const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [5, "The name should be at least four characters"],
  },
  image: {
    type: String,
    required: true,
    match: [
      /^https?:\/\/.+/,
      'The game image should start with "http://" or "https://".',
    ],
  },
  price: {
    type: Number,
    required: true,
    min: [0, "The price should be a positive number."],
  },
  description: {
    type: String,
    required: true,
    minLength: [10, "The description should be at least ten characters long."],
  },
  genre: {
    type: String,
    required: true,
    minLength: [2, "The genre should be at least two characters long"],
  },
  platform: String,
  boughtBy: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
  },
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
