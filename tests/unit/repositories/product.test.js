const {
  productRepository,
} = require("../../../src/frameworks/repository/inMemory");
const { Product } = require("../../../src/entities");
const Chance = require("chance");
const chance = new Chance();
const { cloneDeep } = require("lodash");
describe("Product Repository", () => {
  test("New product should be created and returned", async () => {
    const product = new Product({
      name: chance.name(),
      description: chance.paragraph(),
      images: [chance.url()],
      price: chance.floating(),
      color: chance.color(),
      meta: {},
    });

    const addedProduct = await productRepository.add(product);
    expect(addedProduct).toBeDefined();
    expect(addedProduct.id).toBeDefined();
    expect(addedProduct.name).toBe(product.name);
    expect(addedProduct.description).toBe(product.description);
    expect(addedProduct.price).toBe(product.price);
    expect(addedProduct.color).toBe(product.color);
  });

  test("Product should be deleted", async () => {
    const shouldBeDeletedProduct = new Product({
      name: chance.name(),
      description: chance.paragraph(),
      images: [chance.url()],
      price: chance.floating(),
      color: chance.color(),
      meta: {},
    });

    const shouldStayProduct = new Product({
      name: chance.name(),
      description: chance.paragraph(),
      images: [chance.url()],
      price: chance.floating(),
      color: chance.color(),
      meta: {},
    });
    const [shouldBeDeletedAddedProduct, shouldStayAddedProduct] =
      await Promise.all([
        productRepository.add(shouldBeDeletedProduct),
        productRepository.add(shouldStayProduct),
      ]);

    // Delete One Product
    productRepository.delete(shouldBeDeletedAddedProduct);

    // try to get the deleted Product
    const deletedProduct = await productRepository.getById(
      shouldBeDeletedAddedProduct.id
    );
    expect(shouldBeDeletedAddedProduct).toBeDefined();
    expect(deletedProduct).toBeUndefined();
    expect(shouldStayAddedProduct).toBeDefined();
  });

  test("Product should be updated", async () => {
    const product = new Product({
      name: chance.name(),
      description: chance.paragraph(),
      images: [chance.url()],
      price: chance.floating(),
      color: chance.color(),
      meta: {},
    });

    const addedProduct = await productRepository.add(product);
    const clonedProduct = cloneDeep({
      ...addedProduct,
      name: chance.name(),
      description: chance.paragraph(),
    });

    const updatedProduct = await productRepository.update(clonedProduct);
    expect(updatedProduct).toEqual(clonedProduct);
  });
});
