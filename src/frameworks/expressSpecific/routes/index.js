const express = require("express");
const usersRouter = require("./users");
const productRouter = require("./products");
const orderRouter = require("./orders");

module.exports = (dependencies) => {
  const routes = express.Router();
  const users = usersRouter(dependencies);
  const products = productRouter(dependencies);
  const orders = orderRouter(dependencies);
  routes.use("/users", users);
  routes.use("/products", products);
  routes.use("/orders", orders);
  return routes;
};
