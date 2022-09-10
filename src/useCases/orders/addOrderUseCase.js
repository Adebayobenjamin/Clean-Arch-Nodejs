const { isEmpty } = require("lodash");
const { Order } = require("../../entities");
const { ValidationError, ResponseError } = require("../../frameworks/common");
module.exports = (dependencies) => {
  const {
    orderRepository,
    useCases: {
      user: { getUserByIdUseCase },
      product: { getProductByIdUseCase },
    },
  } = dependencies;
  if (!orderRepository) throw Error("order repository should exist");
  if (!getUserByIdUseCase) throw Error("getuserByID useCase should exist");
  if (!getProductByIdUseCase) throw Error("getProductByID useCase should exist should exist");

  const getValidationErrors = async ({ order }) => {
    const returnable = [];
    // make the validations
    return returnable;
  };

  const execute = async ({ userId, productsIds, date, isPayed, meta }) => {
    const order = new Order({
      userId,
      productsIds,
      date,
      isPayed,
      meta,
    });
    const validationErrors = await validationErrors({ order });
    if (!isEmpty(validationErrors)) {
      return Promise.reject(
        new ResponseError({
          status: 403,
          msg: "Validation Error",
          reason: "Bad Request",
          validationErrors,
        })
      );
    }
    return await orderRepository.add(order);
  };
  return { execute };
};
