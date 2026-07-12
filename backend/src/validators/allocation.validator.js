const { body } = require("express-validator");

exports.allocationValidation = [
  body("asset_id")
    .notEmpty()
    .withMessage("Asset is required")
    .isInt()
    .withMessage("Asset ID must be an integer"),

  body("employee_id")
    .notEmpty()
    .withMessage("Employee is required")
    .isInt()
    .withMessage(
      "Employee ID must be an integer"
    ),

  body("expected_return_date")
    .notEmpty()
    .withMessage(
      "Expected return date is required"
    )
    .isDate()
    .withMessage("Invalid date"),

  body("remarks")
    .optional()
    .isLength({ max: 255 })
    .withMessage(
      "Remarks cannot exceed 255 characters"
    ),
];