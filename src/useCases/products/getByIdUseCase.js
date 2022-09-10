const { Product } = require("../../entities");

module.exports = (dependencies) => {
  const { productRepository } = dependencies;
  if (!productRepository) {
    throw Error("The product repository should exist in dependencies");
  }

  const execute = ({ id }) => {
    return productRepository.getById(id);
  };
  return { execute };
};
