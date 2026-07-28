const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const BadRequestError = require("../errors/bad-request-error");
const ConflictError = require("../errors/conflict-error");
const NotFoundError = require("../errors/not-found-error");

const getCurrentUser = (req, res, next) =>
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) => res.send(user))
    .catch(next);

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  if (!password) {
    return next(new BadRequestError("Invalid data"));
  }

  return bcrypt
    .hash(password, 10)
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
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data"));
      }

      if (err.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }

      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Invalid data"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      res.send({ token });
    })
    .catch(next);
};

const updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFoundError("User not found");
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError" || err.name === "CastError") {
        return next(new BadRequestError("Invalid data"));
      }

      return next(err);
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
  updateCurrentUser,
};
