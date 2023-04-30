const http2 = require('http2');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-err');
const ConflictError = require('../errors/conflict-err');

const { JWT_SECRET, NODE_ENV } = process.env;
const {
  MONGO_DUPLICATE_CODE,
  responseMessage,
  errorMessage,
} = require('../utils/constants');

const { HTTP_STATUS_CREATED } = http2.constants;

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' }
      );

      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: NODE_ENV === 'production' ? true : 'none',
          secure: NODE_ENV === 'production',
        })
        .send({ message: responseMessage.success });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((newUser) => res.status(HTTP_STATUS_CREATED).send(newUser.toJSON()))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(errorMessage.validation));
      } else if (error.code === MONGO_DUPLICATE_CODE) {
        next(new ConflictError(errorMessage.duplicateEmail));
      } else {
        next(error);
      }
    });
};

const logout = (req, res, next) => {
  try {
    res
      .clearCookie('jwt', {
        httpOnly: true,
        sameSite: NODE_ENV === 'production' ? true : 'none',
        secure: NODE_ENV === 'production',
      })
      .send({ message: responseMessage.exit });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUser, login, logout };
