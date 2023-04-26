const mongoose = require('mongoose');
const { HTTP_STATUS_OK } = require('http2').constants;

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const User = require('../models/user');

const { MONGO_DUPLICATE_CODE } = require('../utils/constants');

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId, undefined, { runValidators: true })
    .orFail(() => {
      next(new NotFoundError('Пользователя не существует'));
    })
    .then((user) => {
      res.status(HTTP_STATUS_OK).send(user.toJSON());
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const userId = req.user._id;
  const data = {
    name: req.body.name,
    email: req.body.email,
  };

  User.findByIdAndUpdate(userId, data, {
    runValidators: true,
    new: true,
  })
    .orFail(() => {
      next(new NotFoundError('Пользователя не существует'));
    })
    .then((newInfo) => {
      res.status(HTTP_STATUS_OK).send(newInfo);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Ошибка валидации'));
      } else if (error.code === MONGO_DUPLICATE_CODE) {
        next(new ConflictError('Пользователь с такой почтой уже существует.'));
      } else {
        next(error);
      }
    });
};

module.exports = { getUserInfo, updateUserInfo };
