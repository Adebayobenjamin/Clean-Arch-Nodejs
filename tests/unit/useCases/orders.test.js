const {
  order: {
    addOrderUseCase,
    deleteOrderUseCase,
    getByIdUseCase,
    updateOrderUseCase,
  },
} = require("../../../src/useCases");
const { v4: uuid } = require("uuid");
const Chance = require("chance");
const chance = new Chance();

const mockOrdersRepository = {
  add: jest.fn(async (order) => {
    return {
      ...order,
      id: uuid(),
    };
  }),
  getById: jest.fn(async (id) => {
    return {
      id,
      userId: uuid(),
      productsIds: [uuid(), uuid()],
      date: chance.date(),
      isPayed: chance.bool(),
      meta: {
        address: chance.address(),
      },
    };
  }),
  update: jest.fn(async (order) => order),
  delete: jest.fn(async (order) => order),
};
const dependencies = {
  orderRepository: mockOrdersRepository,
};
describe("Orders Use Case", () => {
  describe("Add Order Use Case", () => {
    test("should add user", async () => {
      // create order
      const testOrderData = {
        userId: uuid(),
        productsIds: [uuid(), uuid()],
        date: chance.date(),
        isPayed: chance.bool(),
        meta: {
          address: chance.address(),
        },
      };
      const addedOrder = await addOrderUseCase(dependencies).execute(
        testOrderData
      );
      // check response
      expect(addedOrder).toBeDefined();
      expect(addedOrder.id).toBeDefined();
      expect(addedOrder.userId).toBeDefined();
      expect(addedOrder.productsIds).toBeDefined();
      expect(addedOrder.date).toBeDefined();
      expect(addedOrder.isPayed).toBeDefined();
      expect(addedOrder.meta).toBeDefined();
      // check the call
      const call = mockOrdersRepository.add.mock.calls[0][0];
      expect(call).toBeDefined();
      expect(call.userId).toBe(testOrderData.userId);
      expect(call.productsIds).toEqual(testOrderData.productsIds);
      expect(call.date).toEqual(testOrderData.date);
      expect(call.isPayed).toBe(testOrderData.isPayed);
      expect(call.meta).toEqual(testOrderData.meta);
    });
  });

  describe("Get Orders By Id Use Case", () => {
    test("should get order by Id", async () => {
      // create id
      const fakeId = uuid();
      // get order by id
      const orderById = await getByIdUseCase(dependencies).execute({
        id: fakeId,
      });
      // check the response
      expect(orderById).toBeDefined();
      expect(orderById.id).toBe(fakeId);
      expect(orderById.userId).toBeDefined();
      expect(orderById.productsIds).toBeDefined();
      expect(orderById.date).toBeDefined();
      expect(orderById.isPayed).toBeDefined();
      expect(orderById.meta).toBeDefined();
      // check the call
      const call = mockOrdersRepository.getById.mock.calls[0][0];
      expect(call).toBeDefined();
      expect(call).toBe(fakeId);
    });
  });

  describe("Update Order Use Case", () => {
    test("should update order", async () => {
      // create order
      const testOrderData = {
        id: uuid(),
        userId: uuid(),
        productsIds: [uuid(), uuid()],
        date: chance.date(),
        isPayed: chance.bool(),
        meta: {
          address: chance.address(),
        },
      };
      // update order
      const updatedOrder = await updateOrderUseCase(dependencies).execute({
        order: testOrderData,
      });
      // check the response
      expect(updatedOrder).toBeDefined();
      expect(updatedOrder).toEqual(testOrderData);
      // check the call
      const call = mockOrdersRepository.update.mock.calls[0][0];
      expect(call).toEqual(testOrderData);
    });
  });

  describe("Delete Order Use Case", () => {
    test("should delete order", async () => {
      const testOrderData = {
        id: uuid(),
        userId: uuid(),
        productsIds: [uuid(), uuid()],
        date: chance.date(),
        isPayed: chance.bool(),
        meta: {
          address: chance.address(),
        },
      };
      // update order
      const deletedOrder = await deleteOrderUseCase(dependencies).execute({
        order: testOrderData,
      });
      // check the response
      expect(deletedOrder).toBeDefined();
      expect(deletedOrder).toEqual(testOrderData);
      // check the call
      const call = mockOrdersRepository.delete.mock.calls[0][0];
      expect(call).toEqual(testOrderData);
    });
  });
});
