const User = require("../models/user");
const { NOT_FOUND } = require("../utils/errors");
const handleError = require("../utils/handleError");

const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleError(res, err));

const getUser = (req, res) =>
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => handleError(res, err));

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  return User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => handleError(res, err));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
