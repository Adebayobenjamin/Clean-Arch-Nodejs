const express = require("express");
const { productController } = require("../../../controllers");
module.exports = (dependencies) => {
  const router = express.Router();
  const {
    addProductController,
    getProductByIdController,
    updateProductController,
    deleteProductController,
  } = productController;

  router
    .route("/")
    .post(addProductController)
    .put(updateProductController)
    .delete(deleteProductController);
  router.route("/:id").get(getProductByIdController);

  return router;
};
