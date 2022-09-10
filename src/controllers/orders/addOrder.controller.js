const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const addOrder = async (req, res, next) => {
    const {
      useCases: {
        order: { addOrderUseCase },
      },
    } = dependencies;
    try {
      const { body = {} } = req;
      const { userId, productsIds, date, isPayed, meta } = body;
      const addOrder = addOrderUseCase(dependencies);
      const response = await addOrder.execute({
        userId,
        productsIds,
        date,
        isPayed,
        meta,
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
  return addOrder;
};
