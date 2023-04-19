const mongoose = require('mongoose');
const { HTTP_STATUS_OK } = require('http2').constants;

const Movie = require('../models/movie');

const getMovies = async (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(HTTP_STATUS_OK).send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const data = req.body;
  const ownerId = req.user._id;

  Movie.create({ ...data, ownerId }).then((newMovie) => {
    res
      .status(HTTP_STATUS_OK)
      .send(newMovie)
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(Error('Ошибка валидации'));
        } else {
          next(err);
        }
      });
  });
};

const deleteMovie = (req, res, next) => {
  const movieId = req.params;
  const userId = req.user._id;

  if (!mongoose.isValidObjectId(movieId)) {
    next(Error('Невалидный ID'));
  }

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        next(Error(`Фильм c ID:${movieId} не найден`));
      }
      if (movie.owner._id.toString() !== userId) {
        next(Error('Можно удалять только свои карточки'));
      } else {
        Movie.deleteOne(movieId).then((deletedMovie) => {
          res.status(HTTP_STATUS_OK).send(deletedMovie).catch(next);
        });
      }
    })
    .catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
