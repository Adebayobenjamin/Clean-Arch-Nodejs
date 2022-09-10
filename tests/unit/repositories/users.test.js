const {
  usersRepository,
} = require("../../../src/frameworks/repository/inMemory");

const {
  User,
  constants: {
    userConstants: { genders },
  },
} = require("../../../src/entities");
const Chance = require("chance");
const chance = new Chance();
const { cloneDeep } = require("lodash");
describe("Users Repository", () => {
  test("New user should be added and returned", async () => {
    const testUser = new User({
      firstname: chance.name(),
      lastname: chance.last(),
      email: chance.email(),
      gender: genders.FEMALE,
      meta: {
        hasir: {
          color: "black",
        },
      },
    });

    const addedUser = await usersRepository.add(testUser);

    expect(addedUser).toBeDefined();
    expect(addedUser.id).toBeDefined();
    expect(addedUser.firstname).toBe(testUser.firstname);
    expect(addedUser.lastname).toBe(testUser.lastname);
    expect(addedUser.email).toBe(testUser.email);
    expect(addedUser.gender).toBe(testUser.gender);
    expect(addedUser.meta).toEqual(testUser.meta);

    const returnedUser = await usersRepository.getById(addedUser.id);

    expect(returnedUser).toEqual(addedUser);
  });
  test(" user should be deleted ", async () => {
    // init two users
    const shouldBeDeletedUser = new User({
      firstname: chance.name(),
      lastname: chance.last(),
      email: chance.email(),
      gender: genders.FEMALE,
      meta: {
        hasir: {
          color: "black",
        },
      },
    });

    const shouldStayUser = new User({
      firstname: chance.name(),
      lastname: chance.last(),
      email: chance.email(),
      gender: genders.FEMALE,
      meta: {
        hasir: {
          color: "blonde",
        },
      },
    });
    // add two users
    const [shouldBeDeletedAddedUser, shouldStayAddedUser] = await Promise.all([
      usersRepository.add(shouldBeDeletedUser),
      usersRepository.add(shouldStayUser),
    ]);

    expect(shouldBeDeletedAddedUser).toBeDefined();
    expect(shouldStayAddedUser).toBeDefined();
    // delete one user

    const deletedUser = await usersRepository.delete(shouldBeDeletedAddedUser);
    expect(deletedUser).toEqual(shouldBeDeletedAddedUser);

    // try to get the deleted user (should be undefined)
    const shouldBeUndefinedUser = await usersRepository.getById(deletedUser.id);
    expect(shouldBeUndefinedUser).toBeUndefined();
    expect(shouldStayAddedUser).toBeDefined();
  });
  test("user should be updated", async () => {
    // Add the user
    const testUser = new User({
      firstname: chance.name(),
      lastname: chance.last(),
      email: chance.email(),
      gender: genders.FEMALE,
      meta: {
        hasir: {
          color: "black",
        },
      },
    });

    const addedUser = await usersRepository.add(testUser);
    expect(addedUser).toBeDefined();
    // update the user
    const clonedUser = cloneDeep({
      ...addedUser,
      firstname: chance.name(),
      gender: genders.MALE,
    });
    const updatedUser = await usersRepository.update(clonedUser);
    expect(updatedUser).toEqual(clonedUser);
  });
});
