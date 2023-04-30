const { Joi, celebrate } = require('celebrate');

const { URI_REGEX, OBJECTID_REGEX } = require('../utils/constants');

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(URI_REGEX),
    trailerLink: Joi.string().required().regex(URI_REGEX),
    thumbnail: Joi.string().required().regex(URI_REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().regex(OBJECTID_REGEX),
  }),
});

module.exports = { createMovieValidation, deleteMovieValidation };
