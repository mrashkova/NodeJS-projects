const Game = require("../models/Game");

exports.getAll = () => Game.find();

exports.create = (gameData) => Game.create(gameData);

exports.getSingleGame = (gameId) => Game.findById(gameId);

exports.update = (gameId, gameData) => Game.findByIdAndUpdate(gameId, gameData);

exports.delete = (gameId) => Game.findByIdAndDelete(gameId);
