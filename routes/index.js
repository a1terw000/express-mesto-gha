const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/cards', auth, cardsRouter);
router.use('/users', auth, usersRouter);
router.use('/signin', signinRouter);
router.use('/signup', signupRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
