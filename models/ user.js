const mongoose = require('mongoose');
const validator = require('validator');

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
      message: 'Неверный формат почты',
    },
  },
});

userSchema.methods.toJSON = function toJSON() {
  const data = this.toObject();

  delete data.password;
  delete data._v;

  return data;
};

module.exports = mongoose.model('user', userSchema);
