const router = require('express').Router();

const NotFoundError = require('../errors/not-found-err');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const authRouter = require('./auth');
const auth = require('../middlewares/auth');
const { logout } = require('../controllers/auth');

router.use('/', authRouter);
router.use(auth);
router.post('/signout', logout);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
