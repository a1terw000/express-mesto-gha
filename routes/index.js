const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const auth = require('../middlewares/auth');

router.use('/cards', auth, cardsRouter);
router.use('/users', auth, usersRouter);
router.use('/signin', signinRouter);
router.use('/signup', signupRouter);
router.use('*', (req, res) => {
  res.status(404).send({ message: 'Страница не найдена' });
});

module.exports = router;
