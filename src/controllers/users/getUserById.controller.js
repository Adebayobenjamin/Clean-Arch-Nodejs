const { Response } = require("../../frameworks/common");
module.exports = (dependencies) => {
  const getUserById = async (req, res, next) => {
    const {
      useCases: {
        user: { getUserByIdUseCase },
      },
    } = dependencies;
    try {
      const {
        params: { id },
      } = req;

      const getUserById = getUserByIdUseCase(dependencies);
      const response = await getUserById.execute({ id });
      res.json(new Response({ status: true, content: response }));
      next();
    } catch (error) {
      next(error);
    }
  };
  return getUserById;
};
