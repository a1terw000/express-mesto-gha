const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { addUser } = require('../controllers/users');
const regexUrl = require('../utils/constants');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    avatar: Joi
      .string()
      .pattern(regexUrl),
  }),
}), addUser);

module.exports = router;
