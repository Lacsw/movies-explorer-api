const mongoose = require('mongoose');
const { HTTP_STATUS_OK } = require('http2').constants;

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const Movie = require('../models/movie');

const getMovies = async (req, res, next) => {
  Movie.find({})
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
        next(new BadRequestError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const userId = req.user._id;

  if (!mongoose.isValidObjectId(_id)) {
    next(new BadRequestError('Невалидный ID'));
  }

  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError(`Фильм c ID:${_id} не найден`));
      }
      if (movie.owner._id.toString() !== userId) {
        next(new ForbiddenError('Можно удалять только свои карточки'));
      } else {
        Movie.findByIdAndDelete(_id)
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
