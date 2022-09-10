module.exports = (dependencies) => {
  const { productRepository } = dependencies;
  if (!productRepository) throw Error("product repository should be required");

  const execute = async ({ product = {} }) => {
    return await productRepository.delete(product);
  };
  return { execute };
};
