const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;

const { errorMessage } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;

  if (res.headersSent) {
    return next(err);
  }

  return res.status(statusCode).json({
    message:
      statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
        ? errorMessage.server
        : message,
    statusCode,
  });
};
