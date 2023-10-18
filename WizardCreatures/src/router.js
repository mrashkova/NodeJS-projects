// 6. Configure routes
const router = require("express").Router();
const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");

// TODO add enpoints with controllers here...
router.use(homeController);
router.use("/users", userController);
router.use("/posts", postController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
