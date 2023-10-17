const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/authMiddleware");

const { PORT, URL } = require("./constants");
const routes = require("./router");

const app = express();

app.use(express.static(path.resolve(__dirname, "./static")));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(auth);

app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

async function dbConnect() {
  await mongoose.connect(URL);
}

dbConnect()
  .then(() => console.log(`Successfully connected to database`))
  .catch((err) =>
    console.log(`Error while connecting to database! Error: ${err}`)
  );

app.use(routes);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
