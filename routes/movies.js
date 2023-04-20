const router = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.patch('/', createMovie);
router.delete('/:_id', deleteMovie);

module.exports = router;
