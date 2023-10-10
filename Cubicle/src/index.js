// Imports
const express = require("express");

const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const dbConnect = require("./config/dbConfig");

const { PORT } = require("./constants");
const routes = require("./router");

// Local variables
const app = express();

// Configs
expressConfig(app);
handlebarsConfig(app);

// Connecting to the DB
dbConnect()
  .then(() => console.log("Successfully connected to DB."))
  .catch((err) => console.log(`Error while connection in DB: ${err}.`));

// Routing
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
