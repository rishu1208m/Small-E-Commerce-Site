const { body, param } = require("express-validator");

exports.createProductValidator = [
  body("name").trim().notEmpty().withMessage("Name Is Required"),
  body("description").trim().notEmpty().withMessage("Description Is Required"),
  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price Must Be A Positive Number"),
  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock Must Be A Non-Negative integer"),
];

exports.updateProductValidator = [
  param("id").isMongoId().withMessage("Invalid Product ID"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price Must Be A Positive Number"),
  body("stock")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Stock Must BE Non-Negative integer"),
];

exports.idValidator = [
  param("id").isMongoId().withMessage("Invalid Product Id"),
];
