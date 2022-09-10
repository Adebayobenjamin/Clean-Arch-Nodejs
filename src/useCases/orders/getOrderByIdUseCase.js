module.exports = (dependencies) => {
  const { orderRepository } = dependencies;
  if (!orderRepository) throw Error("order repository should exist");

  const execute = async ({ id }) => {
    return await orderRepository.getById(id);
  };
  return { execute };
};
