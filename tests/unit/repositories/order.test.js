const {
  orderRepository,
} = require("../../../src/frameworks/repository/inMemory");
const { Order } = require("../../../src/entities");
const uuid = require("uuid").v4;
const Chance = require("chance");
const { cloneDeep, add } = require("lodash");
const chance = new Chance();

describe("Orders Repository", () => {
  test("New order should be added and returned", async () => {
    /**
     * Create New Order
     * Expect / Check the order
     * Get the  and Check if order is equal
     */
    const testOrder = new Order({
      userId: uuid(),
      productsIds: [uuid(), uuid()],
      date: new Date(),
      isPayed: true,
      meta: {
        address: chance.address(),
      },
    });
    const addedOrder = await orderRepository.add(testOrder);
    console.log(addedOrder);
    expect(addedOrder).toBeDefined();
    expect(addedOrder.id).toBeDefined();
    expect(addedOrder.userId).toBe(testOrder.userId);
    expect(addedOrder.productsIds).toEqual(testOrder.productsIds);
    expect(addedOrder.isPayed).toBe(testOrder.isPayed);
    expect(addedOrder.meta).toEqual(testOrder.meta);

    const returnedOrder = await orderRepository.getById(addedOrder.id)
    expect(returnedOrder).toEqual(addedOrder)
  });

  test("Order should be deleted", async () => {
    /**
     * Add Two Orders
     * Delete One Order
     * Check that just relevant order deleted
     */
    const shouldBeDeletedOrder = new Order({
      userId: uuid(),
      productsIds: [uuid(), uuid()],
      date: new Date(),
      isPayed: true,
      meta: {
        address: chance.address(),
      },
    });
    const shouldStayOrder = new Order({
      userId: uuid(),
      productsIds: [uuid(), uuid()],
      date: new Date(),
      isPayed: true,
      meta: {
        address: chance.address(),
      },
    });

    const [shouldBeDeletedAddedOrder, shouldStayAddedOrder] = await Promise.all(
      [
        orderRepository.add(shouldBeDeletedOrder),
        orderRepository.add(shouldStayOrder),
      ]
    );

    expect(shouldBeDeletedAddedOrder).toBeDefined();
    expect(shouldStayAddedOrder).toBeDefined();

    // Delete Order and Test
    const deletedOrder = await orderRepository.delete(
      shouldBeDeletedAddedOrder
    );
    expect(deletedOrder).toBeDefined();
    expect(deletedOrder).toEqual(shouldBeDeletedAddedOrder);

    // Try to get Deleted Order
    const shouldBeUndefinedOrder = await orderRepository.getById(
      deletedOrder.id
    );
    expect(shouldBeUndefinedOrder).toBeUndefined();

    const shouldBeDefinedOrder = await orderRepository.getById(shouldStayAddedOrder.id);
    expect(shouldBeDefinedOrder).toBeDefined();
    expect(shouldBeDefinedOrder).toEqual(shouldStayAddedOrder)
  });

  test("order should be updated", async () => {
    /**
     * Add New Order
     * Update Order with cloning
     * check the update
     */
    const testOrder = new Order({
      userId: uuid(),
      productsIds: [uuid(), uuid()],
      date: new Date(),
      isPayed: true,
      meta: {
        address: chance.address(),
      },
    });
    const addedOrder = await orderRepository.add(testOrder);
    expect(addedOrder).toBeDefined();
    const clonedOrder = cloneDeep({
      ...addedOrder,
      isPayed: false,
    });
    const updatedUser = await orderRepository.update(clonedOrder);
    expect(updatedUser).toBeDefined();
    expect(updatedUser).toEqual(clonedOrder);
  });
});
