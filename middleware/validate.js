const {
  USER_UPDATING_VALIDATION_SCHEMA,
} = require('../utils/validationSchema');

module.exports.validateOnUserUpdate = async (req, res, next) => {
  const { body } = req;
  try {
    const updatedTodo = await USER_UPDATING_VALIDATION_SCHEMA.validate(body);
    req.body = updatedTodo;
    next();
  } catch (error) {
    next(error);
  }
};
