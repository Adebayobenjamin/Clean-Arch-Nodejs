const { Response } = require("../../frameworks/common");
module.exports = (dependencies) => {
  const addUser = async (req, res, next) => {
    const {
      useCases: {
        user: { addUserUseCase },
      },
    } = dependencies;
    try {
      const { body = {} } = req;
      const { id, firstname, email, lastname, gender, meta } = body;
      const addUser = addUserUseCase(dependencies);
      const response = await addUser.execute({
        id,
        firstname,
        email,
        lastname,
        gender,
        meta,
      });
      res.json(new Response({ status: true, content: response }));
      next();
    } catch (error) {
      next(error);
    }
  };
  return addUser;
};
