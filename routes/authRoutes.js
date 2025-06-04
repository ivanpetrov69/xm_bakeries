const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validateInput = require("../middleware/validateInput");

router.post("/register", validateInput(["name", "email", "password"]), authController.register);
router.post("/login", validateInput(["email", "password"]), authController.login);

module.exports = router;
