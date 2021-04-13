const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// @desc    Login/Landing Page
// @router  GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// @desc    Dashboard
// @router  GET /dashboar
router.get("/dashboard", ensureAuth, (req, res) => {
  res.render("dashboard");
  console.log(req.user);
});
module.exports = router;
