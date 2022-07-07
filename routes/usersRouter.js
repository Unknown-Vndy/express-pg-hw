const { Router } = require('express');
const { userController } = require('../controllers');
const { validationErrorHandler } = require('../middleware/errorHandlers');
const { validateOnUserUpdate } = require('../middleware/validate');

const usersRouter = Router();

usersRouter.post('/', userController.createUser);

usersRouter
  .route('/:userId')
  .get(userController.getUser)
  .patch(validateOnUserUpdate, userController.updateUser)
  .delete(userController.deleteUser);

usersRouter.use(validationErrorHandler);

usersRouter.get('/:userId/phones', userController.getUsersPhones);

module.exports = usersRouter;
