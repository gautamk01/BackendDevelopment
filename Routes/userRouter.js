const express = require('express');

const userController = require('../Controllers/userController');

const userRoute = express.Router();

userRoute
  .route('/')
  .get(userController.getallUsers)
  .post(userController.createUser);
userRoute
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRoute;
