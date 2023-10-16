const router = require("express").Router();
const userService = require("../services/userService");
const { extractErrorMsgs } = require("../utils/errorHandler");

router.get("/register", (req, res) => {
  res.render("user/register");
});

router.post("/register", async (req, res) => {
  const { email, password, repeatPassword } = req.body;

  try {
    await userService.register({
      email,
      password,
      repeatPassword,
    });

    const token = await userService.login(wmail, password);

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    console.log(errorMessages);
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
    const errorMessages = extractErrorMsgs(error);
    console.log(errorMessages);
    res.status(404).render("user/login", error);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
