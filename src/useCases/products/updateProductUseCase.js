module.exports = (dependencies) => {
  const { productRepository } = dependencies;
  if (!productRepository)
    throw Error("Product repository should exist in dependencies");

  const execute = async ({ product = {} }) => {
    return await productRepository.update(product);
  };

  return { execute };
};
