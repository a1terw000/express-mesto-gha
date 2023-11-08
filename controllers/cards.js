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
  if (req.params.cardId.length === 24) {
    Card.findByIdAndDelete(req.params.cardId)
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка не найдена' });
          return;
        }
        res.send({ message: 'Карточка успешно удалена' });
      })
      .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
  } else {
    res.status(400).send({ message: 'Некорректный _id' });
  }
};

module.exports.likeCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    )
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка не найдена' });
          return;
        }
        res.send(card);
      })
      .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
  } else {
    res.status(400).send({ message: 'Некорректный _id' });
  }
};

module.exports.dislikeCard = (req, res) => {
  if (req.params.cardId.length === 24) {
    Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } }, // убрать _id из массива
      { new: true },
    )
      .then((card) => {
        if (!card) {
          res.status(404).send({ message: 'Карточка не найдена' });
          return;
        }
        res.send(card);
      })
      .catch(() => res.status(404).send({ message: 'Карточка не найдена' }));
  } else {
    res.status(400).send({ message: 'Некорректный _id' });
  }
};
