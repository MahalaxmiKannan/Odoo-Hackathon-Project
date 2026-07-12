const { body } = require("express-validator");

exports.createEmployeeValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage(
      "Password must be at least 6 characters"
    ),

  body("department_id")
    .notEmpty()
    .withMessage("Department is required"),
];

exports.updateEmployeeValidation = [
  body("name")
    .notEmpty()
    .withMessage("Name is required"),

  body("department_id")
    .notEmpty()
    .withMessage("Department is required"),

  body("status")
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status"),
];