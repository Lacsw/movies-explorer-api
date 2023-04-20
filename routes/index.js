const router = require('express').Router();

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

module.exports = router;
