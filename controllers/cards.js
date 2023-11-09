const Card = require('../models/card');

module.exports.addCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Ошибка сервера' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then(() => {
      res.send({ message: 'Карточка успешно удалена' });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан не валидный ID' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан не валидный ID' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(404).send({ message: 'Карточка не найдена' });
        return;
      }
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Передан не валидный ID' });
        return;
      }
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};
