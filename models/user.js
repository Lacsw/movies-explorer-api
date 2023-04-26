const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/unauthorized-err');
const { errorMessage } = require('../utils/constants');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: errorMessage.incorrectEmailFormat,
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError(errorMessage.incorrectEmaiOrPassword)
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError(errorMessage.incorrectEmaiOrPassword)
          );
        }
        return user;
      });
    });
};

userSchema.methods.toJSON = function toJSON() {
  const data = this.toObject();

  delete data.password;
  delete data.__v;

  return data;
};

module.exports = mongoose.model('user', userSchema);
