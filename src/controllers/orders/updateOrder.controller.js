const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const updateOrder = async (req, res, next) => {
    const {
      useCases: {
        order: { updateOrderUseCase },
      },
    } = dependencies;
    try {
      const { body = {} } = req;
      const { id, userId, productsIds, date, isPayed, meta } = body;
      const updateOrder = updateOrderUseCase(dependencies);
      const response = await updateOrder.execute({
        order: { id, userId, productsIds, date, isPayed, meta },
      });
      res.json(
        new Response({
          status: true,
          content: response,
        })
      );
      next();
    } catch (error) {
      next(error);
    }
  };
  return updateOrder;
};
