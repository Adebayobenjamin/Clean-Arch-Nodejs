const { Response } = require("../../frameworks/common");
module.exports = (dependencies) => {
  const updateProduct = async (req, res, next) => {
    const {
      useCases: {
        product: { updateProductUseCase },
      },
    } = dependencies;
    try {
      const { body = {} } = req;
      const { id, name, description, images, price, color, meta } = body;
      const updateProduct = updateProductUseCase(dependencies);
      const response = await updateProduct.execute({
        product: { id, name, description, images, price, color, meta },
      });
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
  return updateProduct;
};
