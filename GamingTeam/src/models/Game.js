const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  description: String,
  genre: String,
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
