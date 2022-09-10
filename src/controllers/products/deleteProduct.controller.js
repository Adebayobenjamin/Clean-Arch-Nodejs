const { Response } = require("../../frameworks/common");
module.exports = (dependencies) => {
  const deleteProduct = async (req, res, next) => {
    const {
      useCases: {
        product: { deleteProductUseCase },
      },
    } = dependencies;
    try {
      const { body = {} } = req;
      const { id, name, description, images, price, color, meta } = body;
      const deleteProduct = deleteProductUseCase(dependencies);
      const response = await deleteProduct.execute({
     product:  { id,
        name,
        description,
        images,
        price,
        color,
        meta,}
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
  return deleteProduct;
};
