const jwt = require('jsonwebtoken');

const { SECRET_KEY = 'DanilBaidak' } = process.env;
const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Необходимо авторизоваться');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new AuthorizationError('Необходимо авторизоваться');
  }
  req.user = payload;
  next();
};
