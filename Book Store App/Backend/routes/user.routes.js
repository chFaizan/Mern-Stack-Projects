const express = require("express");
const { signup, login } = require("../controller/user.controller");

const router = express.Router();

// Change GET to POST
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;




