// Imports
const express = require("express");
const cookieParser = require("cookie-parser");

const expressConfig = require("./config/expressConfig");
const handlebarsConfig = require("./config/handlebarsConfig");
const dbConnect = require("./config/dbConfig");

const { PORT } = require("./constants");
const routes = require("./router");

const { auth } = require("./middlewares/authMiddleware");

// Local variables
const app = express();

// Configs
expressConfig(app);
handlebarsConfig(app);

// Return token in cookie
app.use(cookieParser());

// Authorization middleware
app.use(auth);

// Connecting to the database
dbConnect()
  .then(() => console.log("Successfully connected to the Database!"))
  .catch((err) => console.log(`Error while connecting to the DB: ${err}`));

// Routing
app.use(routes);

// PORT check
app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
