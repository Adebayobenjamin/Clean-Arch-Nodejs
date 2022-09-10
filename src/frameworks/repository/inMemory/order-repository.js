const { inMemory } = require("../../database");
const uuid = require("uuid").v4;
module.exports = {
  add: async (order) => {
    if (!order.id) {
      order.id = uuid();
    }
    inMemory.orders.push(order);
    return order;
  },
  update: async (order) => {
    const index = inMemory.orders.findIndex(({ id }) => id == order.id);
    if (index > -1) {
      inMemory.orders[index] = order;
      return inMemory.orders[index];
    }
    return null;
  },
  delete: async (order) => {
    const index = inMemory.orders.findIndex(({ id }) => id == order.id);
    if (index > -1) {
      inMemory.orders.splice(index, 1);
      return order;
    }
    return order;
  },
  getById: async (id) => {
    return inMemory.orders.find((order) => order.id == id);
  },
};
