module.exports = (dependencies) => {
    const { orderRepository } = dependencies;
    if (!orderRepository) throw Error("order repository should exist");
  
    const execute = async ({ order = {} }) => {
      return await orderRepository.delete(order);
    };
    return { execute };
  };
  