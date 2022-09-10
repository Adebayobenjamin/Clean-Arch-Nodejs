const addProductController = require("./addProduct.controller");
const getProductByIdController = require("./getProductById.controller");
const updateProductController = require("./updateProduct.controller");
const deleteProductController = require("./deleteProduct.controller");
const dependencies = require("../../config/dependencies");

module.exports = {
  addProductController: addProductController(dependencies),
  getProductByIdController: getProductByIdController(dependencies),
  updateProductController: updateProductController(dependencies),
  deleteProductController: deleteProductController(dependencies),
};
