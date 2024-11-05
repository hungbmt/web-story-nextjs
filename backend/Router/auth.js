const express = require("express");
const router = express.Router();
const AuthController = require("./../Controller/AuthController");
router.post("/register", AuthController.Apiregister);
router.post("/login", AuthController.ApiLogin);
router.post("/reset-token", AuthController.ApiResetToken);
module.exports = router;
