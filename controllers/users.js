const mongoose = require('mongoose');
const { HTTP_STATUS_OK } = require('http2').constants;

const User = require('../models/user');

const getUserInfo = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId, undefined, { runValidators: true })
    .orFail(() => {
      next(Error('Пользователя не существует'));
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
    about: req.body.about,
  };

  User.findByIdAndUpdate(userId, data, {
    runValidators: true,
    new: true,
  })
    .orFail(() => {
      next(Error('Пользователя не существует'));
    })
    .then((newInfo) => {
      res.status(HTTP_STATUS_OK).send(newInfo);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(Error('Ошибка валидации'));
      } else {
        next(error);
      }
    });
};

module.exports = { getUserInfo, updateUserInfo };
