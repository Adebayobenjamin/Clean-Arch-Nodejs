const { User } = require("../../entities");

module.exports = (dependencies) => {
  const { usersRepository } = dependencies;
  if (!usersRepository) {
    throw new Error("The users repository should exist in dependencies");
  }

  const execute = ({ firstname, lastname, email, gender, meta }) => {
    const user = new User({ firstname, lastname, email, gender, meta });
    return usersRepository.add(user);
  };
  return { execute };
};
