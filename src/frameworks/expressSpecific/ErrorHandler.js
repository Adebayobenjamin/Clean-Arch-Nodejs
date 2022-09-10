const { ResponseError, Response } = require("../common/Response");
module.exports = (err, req, res, next) => {
  const error = new ResponseError({
    status: err.status || 500,
    msg: err.msg || err.message,
    reason: err.reason || err.stack || "Something went wrong",
    url: req.originalUrl,
    ip: req.ip,
    validationErrors: err.validationErrors || []
  });

  res.status(error.status).json(
    new Response({
      status: false,
      error,
    })
  );
};
