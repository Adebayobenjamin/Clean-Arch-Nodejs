const {
  product: {
    addProductUseCase,
    getProductByIdUseCase,
    updateProductUseCase,
    deleteProductUseCase,
  },
} = require("../../../src/useCases");
const Chance = require("chance");
const chance = new Chance();
const { v4: uuid } = require("uuid");

const mockProductRepository = {
  add: jest.fn(async (product) => {
    return {
      ...product,
      id: uuid(),
    };
  }),
  getById: jest.fn(async (id) => {
    return {
      id,
      name: chance.name(),
      description: chance.sentence(),
      images: [chance.url(), chance.url()],
      price: chance.natural(),
      color: chance.color(),
      meta: {},
    };
  }),
  update: jest.fn(async (product) => product),
  delete: jest.fn(async (product) => product),
};
const dependencies = {
  productRepository: mockProductRepository,
};

describe("Product Use Case", () => {
  describe("Add Product Use Case", () => {
    test("should add product", async () => {
      // create the product
      const testProductData = {
        name: chance.name(),
        description: chance.sentence(),
        images: [chance.url(), chance.url()],
        price: chance.natural(),
        color: chance.color(),
        meta: {},
      };

      const addedProduct = await addProductUseCase(dependencies).execute(
        testProductData
      );
      // check the product
      expect(addedProduct).toBeDefined();
      expect(addedProduct.id).toBeDefined();
      expect(addedProduct.name).toBe(testProductData.name);
      expect(addedProduct.description).toBe(testProductData.description);
      expect(addedProduct.images).toEqual(testProductData.images);
      expect(addedProduct.price).toBe(testProductData.price);
      expect(addedProduct.color).toBe(testProductData.color);
      expect(addedProduct.meta).toEqual(testProductData.meta);
      // check the call
      const call = mockProductRepository.add.mock.calls[0][0];
      expect(call).toBeDefined();
      expect(call.name).toBe(testProductData.name);
      expect(call.description).toBe(testProductData.description);
      expect(call.images).toEqual(testProductData.images);
      expect(call.price).toBe(testProductData.price);
      expect(call.color).toBe(testProductData.color);
      expect(call.meta).toEqual(testProductData.meta);
    });
  });

  describe("Get Product By Id Use Case", () => {
    test("should get user by Id", async () => {
      // generate fake Id
      const fakeId = uuid();
      // Get product By Id
      const productById = await getProductByIdUseCase(dependencies).execute({
        id: fakeId,
      });
      // check result
      expect(productById).toBeDefined();
      expect(productById.id).toBe(fakeId);
      expect(productById.name).toBeDefined();
      expect(productById.description).toBeDefined();
      expect(productById.images).toBeDefined();
      expect(productById.price).toBeDefined();
      expect(productById.color).toBeDefined();
      expect(productById.meta).toBeDefined();
      // check the call
      const call = mockProductRepository.getById.mock.calls[0][0];
      expect(call).toBeDefined();
      expect(call).toBe(fakeId);
    });
  });

  describe("Update Product Use Case", () => {
    test("should update product", async () => {
      // create product
      const testProductData = {
        id: uuid(),
        name: chance.name(),
        description: chance.sentence(),
        images: [chance.url(), chance.url()],
        price: chance.natural(),
        color: chance.color(),
        meta: {},
      };
      // update product
      const updatedProduct = await updateProductUseCase(dependencies).execute({
        product: testProductData,
      });
      // check the result
      expect(updatedProduct).toBe(testProductData);
      // check the call
      const call = mockProductRepository.update.mock.calls[0][0];
      expect(call).toBeDefined();
      expect(call).toEqual(testProductData);
    });
  });

  describe("Delete Product UseCase", () => {
    test("should delete product", async () => {
      // create product
      const testProductData = {
        id: uuid(),
        name: chance.name(),
        description: chance.sentence(),
        images: [chance.url(), chance.url()],
        price: chance.natural(),
        color: chance.color(),
        meta: {},
      };
      // update product
      const deletedProduct = await deleteProductUseCase(dependencies).execute({
        product: testProductData,
      });
      // check the result
      expect(deletedProduct).toBe(testProductData);
      // check the call
      const call = mockProductRepository.delete.mock.calls[0][0];
      expect(call).toBeDefined();
      expect(call).toEqual(testProductData);
    });
  });
});
