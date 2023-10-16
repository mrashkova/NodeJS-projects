const express = require("express");
const path = require("path"); // import path

const expressConfig = (app) => {
  app.use(express.static(path.resolve(__dirname, "../static"))); //improt path
  app.use(express.urlencoded({ extended: false })); // bodyparser
};

module.exports = expressConfig;
