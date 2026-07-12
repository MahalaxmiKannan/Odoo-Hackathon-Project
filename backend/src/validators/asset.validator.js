const { body } = require("express-validator");

const createAssetValidation = [
  body("asset_name")
    .trim()
    .notEmpty()
    .withMessage("Asset name is required"),

  body("category_id")
    .notEmpty()
    .withMessage("Category is required")
    .isInt()
    .withMessage("Category must be an integer"),

  body("purchase_date")
    .notEmpty()
    .withMessage("Purchase date is required"),

  body("purchase_cost")
    .notEmpty()
    .withMessage("Purchase cost is required")
    .isNumeric()
    .withMessage("Purchase cost must be numeric"),
];

const updateAssetValidation = [
  body("asset_name")
    .trim()
    .notEmpty()
    .withMessage("Asset name is required"),

  body("category_id")
    .notEmpty()
    .withMessage("Category is required")
    .isInt(),

  body("purchase_date")
    .notEmpty()
    .withMessage("Purchase date is required"),

  body("purchase_cost")
    .notEmpty()
    .withMessage("Purchase cost is required")
    .isNumeric(),

  body("status")
    .optional()
    .isIn([
      "AVAILABLE",
      "ALLOCATED",
      "MAINTENANCE",
      "RETIRED",
    ])
    .withMessage("Invalid status"),
];

module.exports = {
  createAssetValidation,
  updateAssetValidation,
};