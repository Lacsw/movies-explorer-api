const router = require('express').Router();

const { login, createUser } = require('../controllers/auth');
const { loginValidation, signupValidation } = require('../validation/auth');

router.post('/signin', loginValidation, login);
router.post('/signup', signupValidation, createUser);

module.exports = router;
