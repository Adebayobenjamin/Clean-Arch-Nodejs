const express = require("express");
const app = express();
const API_PREFIX = process.env.API_PREFIX || "/api/v1";
const dependencies = require("./config/dependencies");
const ErrorHandler = require("./frameworks/expressSpecific/ErrorHandler");
module.exports = {
  start: () => {
    // middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // ROutes
    const routes = require("./frameworks/expressSpecific/routes");
    app.use(API_PREFIX, routes(dependencies));
    // Common Error Handler
    app.use(ErrorHandler);
    const PORT = process.env.PORT || 3033;
    app.listen(PORT, console.log("app is running on port", PORT));
  },
};
