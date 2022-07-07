const { User } = require('./../models');

const { isEmpty } = require('lodash');

module.exports.getUser = async (req, res, next) => {
  const {
    params: { userId },
  } = req;

  try {
    const user = await User.get(userId);
    if (user) {
      return res.status(200).send({ user });
    }
    res.status(404).send('user not found');
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const newUser = await User.create(body);
    res.status(201).send({ newUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  const {
    params: { userId },
    body,
  } = req;

  try {
    const updatedUser = await User.update(userId, body);

    if (updatedUser) {
      return res.status(200).send(`user with id ${userId} modified`);
    }
    res.status(404).send('user not found');
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.delete(userId);
    if (deletedUser) {
      return res.status(204).end();
    }
    res.status(404).send('User Not Found');
  } catch (err) {
    next(err);
  }
};
module.exports.getUsersPhones = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await User.get(userId);
    if (user) {
      const userPhones = await User.getUsersPhones(userId);
      if (isEmpty(userPhones)) {
        return res.status(204).end();
      }
      if (userPhones) {
        return res.status(200).send(userPhones);
      }
    }
    res.status(404).send('user not found');
  } catch (err) {
    next(err);
  }
};
