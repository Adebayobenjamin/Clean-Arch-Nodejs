const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const deleteOrder = async (req, res, next) => {
    const {
      useCases: {
        order: { deleteOrderUseCase },
      },
    } = dependencies;
    try {
      const { body = {} } = req;
      const { id, userId, productsIds, date, isPayed, meta } = body;
      const deleteOrder = deleteOrderUseCase(dependencies);
      const response = await deleteOrder.execute({
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
  return deleteOrder;
};
