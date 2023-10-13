const express = require("express");
const handlebars = require("express-handlebars"); // 9. Configure handlebars
const path = require("path"); // 5. Import 'path'

const { PORT } = require("./constants");
const routes = require("./router");

// Init
const app = express();

// Express configurations
app.use(express.static(path.resolve(__dirname, "./static"))); // 5. Import 'path'
app.use(express.urlencoded({ extended: false })); // 4. Configure bodyparser

// Handlebars configuration
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");
app.set("views", "src/views");

// Routes
app.get("/", (req, res) => {
  // res.send("Hello home page");
  res.render("home");
});

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
