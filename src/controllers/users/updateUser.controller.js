const { Response } = require("../../frameworks/common");
module.exports = (dependencies) => {
  const updateUser = async (req, res, next) => {
    const {
      useCases: {
        user: { updateUserUseCase },
      },
    } = dependencies;
    try {
      const {
        body: { id, firstname, email, lastname, gender, meta},
      } = req;

      const updateUser = updateUserUseCase(dependencies);
      const response = await updateUser.execute({
        user: { id, firstname, email, lastname, gender, meta},
      });
      res.json(new Response({ status: true, content: response }));
      next();
    } catch (error) {
      next(error);
    }
  };
  return updateUser
};
