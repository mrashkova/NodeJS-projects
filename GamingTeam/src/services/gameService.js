const Game = require("../models/Game");

exports.getAll = () => Game.find();

exports.create = (gameData) => Game.create(gameData);

exports.getSingleGame = (gameId) => Game.findById(gameId);

exports.update = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData);

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);

exports.addBoughtBy = async (gameId, userId) => {
  const game = await this.getSingleGame(gameId);

  const hasBought = game.boughtBy.some((b) => b?.toString() === userId);

  if (hasBought) {
    return;
  }
  game.boughtBy.push(userId);
  return game.save();
};
