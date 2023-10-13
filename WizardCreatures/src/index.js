const express = require("express");
const handlebars = require("express-handlebars"); // 9. Configure handlebars
const path = require("path"); // 5. Import 'path'
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { auth } = require("./middlewares/authMiddleware");

const { PORT, DB_URL } = require("./constants");
const routes = require("./router");

// Local variables
const app = express();

// Express configurations
app.use(express.static(path.resolve(__dirname, "./static"))); // 5. Import 'path'
app.use(express.urlencoded({ extended: false })); // 4. Configure bodyparser
app.use(cookieParser()); // 17. Return token in cookie
app.use(auth); // 19. Authentication middleware

// Handlebars configuration
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

// Database connection
async function dbConnect() {
  await mongoose.connect(DB_URL);
}

dbConnect()
  .then(() => console.log(`Successfully connected to the database`))
  .catch((err) =>
    console.log(`Error while connecting to the DB! Error: ${err}`)
  );

// Routes
app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
