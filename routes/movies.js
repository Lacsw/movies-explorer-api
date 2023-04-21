const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { URI_REGEX, OBJECTID_REGEX } = require('../utils/constants');

router.get('/', getMovies);
router.patch(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.number().integer().min(0),
      description: Joi.string().required(),
      image: Joi.string().required().regex(URI_REGEX),
      trailerLink: Joi.string().required().regex(URI_REGEX),
      thumbnail: Joi.string().required().regex(URI_REGEX),
      movieId: Joi.string().required().regex(OBJECTID_REGEX),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createMovie
);
router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().regex(OBJECTID_REGEX),
    }),
  }),
  deleteMovie
);

module.exports = router;
