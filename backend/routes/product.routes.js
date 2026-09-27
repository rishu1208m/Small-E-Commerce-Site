const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const authenticate = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  createProductValidator,
  updateProductValidator,
  idValidator,
} = require("../validators/product.validator");

router.post("/", authenticate, createProductValidator, validate, createProduct);
router.get("/", getProducts);
router.get("/:id", idValidator, validate, getProductById);
router.put(
  "/:id",
  authenticate,
  updateProductValidator,
  validate,
  updateProduct,
);
router.delete("/:id", authenticate, idValidator, validate, deleteProduct);

module.exports = router;
