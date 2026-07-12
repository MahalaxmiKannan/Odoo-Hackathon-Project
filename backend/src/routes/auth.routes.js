const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

const {
  signupValidation,
  loginValidation,
} = require("../validators/auth.validator");

const validate = require("../middleware/validate.middleware");

router.post(
  "/signup",
  signupValidation,
  validate,
  authController.signup
);

router.post(
  "/login",
  loginValidation,
  validate,
  authController.login
);

router.post(
  "/forgot-password",
  authController.forgotPassword
);

module.exports = router;