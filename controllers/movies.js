const mongoose = require('mongoose');
const { HTTP_STATUS_OK } = require('http2').constants;

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const Movie = require('../models/movie');

const { errorMessage } = require('../utils/constants');

const getMovies = async (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.status(HTTP_STATUS_OK).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const data = req.body;
  const owner = req.user._id;

  Movie.create({ ...data, owner })
    .then((newMovie) => {
      res.status(HTTP_STATUS_OK).send(newMovie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(errorMessage.validation));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (!mongoose.isValidObjectId(id)) {
    next(new BadRequestError(errorMessage.validationID));
  }

  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(errorMessage.filmNotFound));
      }
      if (movie.owner._id.toString() !== userId) {
        next(new ForbiddenError(errorMessage.forbidden));
      } else {
        Movie.findByIdAndDelete(id)
          .then((deletedMovie) => {
            res.status(HTTP_STATUS_OK).send(deletedMovie);
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
