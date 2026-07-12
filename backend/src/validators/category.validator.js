const { body } = require("express-validator");

const createCategoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

const updateCategoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
];

module.exports = {
  createCategoryValidation,
  updateCategoryValidation,
};