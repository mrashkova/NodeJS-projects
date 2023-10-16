const express = require("express");
const cookieParser = require("cookie-parser");

const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const dbConnect = require("./config/dbConfig");

const { PORT } = require("./constants");
const routes = require("./router");

const { auth } = require("./middlewares/authMiddleware");

const app = express();

app.use(cookieParser());
app.use(auth);

expressConfig(app);
handlebarsConfig(app);

dbConnect()
  .then(() => console.log("Successfully connected to DB."))
  .catch((err) => console.log(`Error while connection to DB: ${err}`));

app.use(routes);

app.listen(PORT, console.log(`Server is running on port ${PORT}`));
