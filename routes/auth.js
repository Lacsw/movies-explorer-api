const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const { login, createUser } = require('../controllers/auth');

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  }),
  login
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    }),
  }),
  createUser
);

module.exports = router;
