const { Response } = require("../../frameworks/common");
module.exports = (dependencies) => {
  const getProductById = async (req, res, next) => {
    const {
      useCases: {
        product: { getProductByIdUseCase },
      },
    } = dependencies;
    try {
      const { params = {} } = req;
      const { id } = params;
      const getProductById = getProductByIdUseCase(dependencies);
      const response = await getProductById.execute({ id });
      res.status(200).json(
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
  return getProductById;
};
