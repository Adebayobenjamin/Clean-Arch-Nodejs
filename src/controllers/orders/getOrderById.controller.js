const { Response } = require("../../frameworks/common/Response");

module.exports = (dependencies) => {
  const getOrderById = async (req, res, next) => {
    const {
      useCases: {
        order: { getByIdUseCase },
      },
    } = dependencies;
    try {
      const { params = {} } = req;
      const { id } = params;
      const getOrderById = getByIdUseCase(dependencies);
      const response = await getOrderById.execute({ id });
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
  return getOrderById;
};
