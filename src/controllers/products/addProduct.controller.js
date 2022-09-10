const { Response } = require("../../frameworks/common");
module.exports = (dependencies) => {
  const addProduct = async (req, res, next) => {
    const {
      useCases: {
        product: { addProductUseCase },
      },
    } = dependencies;
    try {
      const { body = {} } = req;
      const { name, description, images, price, color, meta } = body;
      const addProduct = addProductUseCase(dependencies);
      const response = await addProduct.execute({
        name,
        description,
        images,
        price,
        color,
        meta,
      });
      res.status(201).json(
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
  return addProduct;
};
