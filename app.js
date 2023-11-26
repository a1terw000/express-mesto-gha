const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL, {
  //
});

app.use('/', require('./routes/index'));

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'Ошибка сервера'
      : message,
  });
  next();
});

app.listen(PORT);
