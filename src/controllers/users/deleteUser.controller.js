const { Response } = require("../../frameworks/common");
module.exports = (dependencies) => {
  const deleteUser = async (req, res, next) => {
    const {
      useCases: {
        user: { deleteUserUseCase },
      },
    } = dependencies;
    try {
      const {
        body: { id, firstname, email, lastname, gender, meta },
      } = req;

      const deleteUser = deleteUserUseCase(dependencies);
      const response = await deleteUser.execute({
        user: { id, firstname, email, lastname, gender, meta },
      });
      res.json(new Response({ status: true, content: response }));
      next();
    } catch (error) {
      next(error);
    }
  };
  return deleteUser;
};
