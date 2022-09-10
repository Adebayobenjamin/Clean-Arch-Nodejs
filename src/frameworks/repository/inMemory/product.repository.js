const { inMemory } = require("../../database");
const uuidv4 = require("uuid").v4;
module.exports = {
  add: async (product) => {
    if (!product.id) {
      product.id = uuidv4();
    }
    inMemory.products.push(product);
    return product;
  },

  update: async (product) => {
    const index = inMemory.products.findIndex(({ id }) => id === product.id);
    if (index >= 0) {
      inMemory.products[index] = product;
      return inMemory.products[index];
    }
    return null;
  },

  delete: async (product) => {
    const index = inMemory.products.findIndex(({ id }) => id === product.id);
    if (index >= 0) {
      inMemory.products.splice(index, 1);
      return product;
    }
    return null;
  },

  getById: async (id) => {
    return inMemory.products.find((product) => product.id === id);
  },
};
