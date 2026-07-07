const {
  BAD_REQUEST,
  CONFLICT,
  FORBIDDEN,
  NOT_FOUND,
  SERVER_ERROR,
  UNAUTHORIZED,
} = require("./errors");

const handleError = (res, err) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: "Invalid data" });
  }

  if (err.code === 11000) {
    return res.status(CONFLICT).send({ message: "Email already exists" });
  }

  if (err.statusCode === CONFLICT) {
    return res.status(CONFLICT).send({ message: err.message });
  }

  if (err.statusCode === UNAUTHORIZED) {
    return res.status(UNAUTHORIZED).send({ message: err.message });
  }

  if (err.statusCode === FORBIDDEN) {
    return res.status(FORBIDDEN).send({ message: err.message });
  }

  if (err.statusCode === NOT_FOUND) {
    return res.status(NOT_FOUND).send({ message: err.message });
  }

  return res
    .status(SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
};

module.exports = handleError;
