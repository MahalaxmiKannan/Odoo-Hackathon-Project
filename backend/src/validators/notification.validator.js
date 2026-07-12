const { param } = require(
  "express-validator"
);

const userIdValidation = [
  param("userId")
    .isInt()
    .withMessage("Invalid user id"),
];

const notificationIdValidation = [
  param("id")
    .isInt()
    .withMessage("Invalid notification id"),
];

module.exports = {
  userIdValidation,
  notificationIdValidation,
};