const express = require("express");
const { orderController } = require("../../../controllers");
module.exports = (dependencies) => {
  const router = express.Router();
  const {
    addOrderController,
    getOrderByIdController,
    updateOrderController,
    deleteOrderController,
  } = orderController(dependencies);

  router
    .route("/")
    .post(addOrderController)
    .put(updateOrderController)
    .delete(deleteOrderController);
  router.route("/:id").get(getOrderByIdController);

  return router;
};
