const { body } = require("express-validator");

const createDepartmentValidation = [
  body("name")
    .notEmpty()
    .withMessage("Department name is required"),

  body("code")
    .notEmpty()
    .withMessage("Department code is required"),
];

module.exports = {
  createDepartmentValidation,
};