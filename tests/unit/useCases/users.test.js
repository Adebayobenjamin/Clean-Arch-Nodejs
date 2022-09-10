const {
  user: {
    addUserUseCase,
    getUserByIdUseCase,
    updateUserUseCase,
    deleteUserUseCase,
  },
} = require("../../../src/useCases");
const {
  User,
  constants: { userConstants },
} = require("../../../src/entities");
const Chance = require("chance");
const chance = Chance();
const { v4: uuid } = require("uuid");
const mockusersRepository = {
  add: jest.fn(async (user) => {
    return {
      ...user,
      id: uuid(),
    };
  }),
  getById: jest.fn(async (id) => {
    return {
      id,
      firstname: chance.name(),
      lastname: chance.last(),
      email: chance.email(),
      gender: userConstants.genders.FEMALE,
      meta: {},
    };
  }),
  update: jest.fn(async (user) => user),
  delete: jest.fn(async (user) => user),
};

const dependencies = {
  usersRepository: mockusersRepository,
};
describe("User use cases", () => {
  describe("Add User Use Case", () => {
    test("should add new user", async () => {
      // create a user data
      const testUserData = {
        firstname: chance.name(),
        lastname: chance.last(),
        email: chance.email(),
        gender: userConstants.genders.FEMALE,
        meta: {
          hair: {
            color: "black",
          },
        },
      };

      // add user using use case
      const addedUser = await addUserUseCase(dependencies).execute(
        testUserData
      );
      //  check the recieved data
      expect(addedUser).toBeDefined();
      expect(addedUser.id).toBeDefined();
      expect(addedUser.firstname).toBe(testUserData.firstname);
      expect(addedUser.lastname).toBe(testUserData.lastname);
      expect(addedUser.email).toBe(testUserData.email);
      expect(addedUser.gender).toBe(testUserData.gender);
      expect(addedUser.meta).toEqual(testUserData.meta);
      // Check that dependencies called as expected
      const call = mockusersRepository.add.mock.calls[0][0];
      expect(call.id).toBeUndefined();
      expect(call.firstname).toBe(testUserData.firstname);
      expect(call.lastname).toBe(testUserData.lastname);
      expect(call.email).toBe(testUserData.email);
      expect(call.gender).toBe(testUserData.gender);
      expect(call.meta).toEqual(testUserData.meta);
    });
  });

  describe("Get User By Id Use Case", () => {
    test("should get user by id", async () => {
      // generate fake Id
      const fakeId = uuid();
      //   get user by id
      const userById = await getUserByIdUseCase(dependencies).execute({
        id: fakeId,
      });

      //   check the data
      expect(userById).toBeDefined();
      expect(userById.id).toBe(fakeId);
      expect(userById.firstname).toBeDefined();
      expect(userById.lastname).toBeDefined();
      expect(userById.email).toBeDefined();
      expect(userById.gender).toBeDefined();
      expect(userById.meta).toBeDefined();
      // check the mock
      const call = mockusersRepository.getById.mock.calls[0][0];

      expect(call).toBe(fakeId);
    });
  });

  describe("Update User Use Case", () => {
    test("should update user", async () => {
      // create user
      const testUserData = {
        id: uuid(),
        firstname: chance.name(),
        lastname: chance.last(),
        email: chance.email(),
        gender: userConstants.genders.FEMALE,
        meta: {
          hair: {
            color: "black",
          },
        },
      };
      // call update user
      const updatedUser = await updateUserUseCase(dependencies).execute({
        user: testUserData,
      });
      // check the result
      expect(updatedUser).toBe(testUserData);
      // check the call
      const call = mockusersRepository.update.mock.calls[0][0];
      expect(call).toEqual(testUserData);
    });
  });

  describe("Delete USer Use Case", () => {
    test("should delete user", async () => {
      // create user
      const testUserData = {
        id: uuid(),
        firstname: chance.name(),
        lastname: chance.last(),
        email: chance.email(),
        gender: userConstants.genders.FEMALE,
        meta: {
          hair: {
            color: "black",
          },
        },
      };
      // call delete
      const deletdUser = await deleteUserUseCase(dependencies).execute({
        user: testUserData,
      });
      // check returned data
      expect(deletdUser).toEqual(testUserData);
      // check call
      const call = mockusersRepository.delete.mock.calls[0][0];
      expect(call).toEqual(testUserData);
    });
  });
});
