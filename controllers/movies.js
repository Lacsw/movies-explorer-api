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
  const owner = req.user._id;

  Movie.create({ ...data, owner })
    .then((newMovie) => {
      res.status(HTTP_STATUS_OK).send(newMovie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(Error('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const userId = req.user._id;

  if (!mongoose.isValidObjectId(_id)) {
    next(Error('Невалидный ID'));
  }

  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        next(Error(`Фильм c ID:${_id} не найден`));
      }
      if (movie.owner._id.toString() !== userId) {
        next(Error('Можно удалять только свои карточки'));
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
