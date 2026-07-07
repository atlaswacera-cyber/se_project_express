const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { BAD_REQUEST, CONFLICT, NOT_FOUND } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const handleError = require("../utils/handleError");

const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleError(res, err));

const getCurrentUser = (req, res) =>
  User.findById(req.user._id)
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => handleError(res, err));

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  if (!password) {
    return res.status(BAD_REQUEST).send({ message: "Invalid data" });
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        const error = new Error("Email already exists");
        error.statusCode = CONFLICT;
        throw error;
      }

      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(201).send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      })
    )
    .catch((err) => handleError(res, err));
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST).send({ message: "Invalid data" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch((err) => handleError(res, err));
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = NOT_FOUND;
      throw error;
    })
    .then((user) => res.send(user))
    .catch((err) => handleError(res, err));
};

module.exports = {
  getUsers,
  getCurrentUser,
  createUser,
  login,
  updateCurrentUser,
};
