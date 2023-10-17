const router = require("express").Router();
const userService = require("../services/userService");

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  try {
    await userService.register({
      username,
      email,
      password,
      repeatPassword,
    });

    const token = await userService.login(email, password);

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    res.status(404).render("user/register", error);
  }
});

router.get("/login", (req, res) => {
  res.render("user/login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.login(email, password);

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    res.status(404).render("user/login", error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
