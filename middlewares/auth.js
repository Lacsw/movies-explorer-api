const jwt = require('jsonwebtoken');
require('dotenv').config();

const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  let token;

  if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.replace('Bearer ', '');
  } else {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  try {
    const payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
    );
    req.user = payload;
  } catch (error) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  return next();
};
