const { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } = require("./errors");

const handleError = (res, err) => {
  console.error(err);

  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: err.message });
  }

  if (err.statusCode === NOT_FOUND) {
    return res.status(NOT_FOUND).send({ message: err.message });
  }

  return res
    .status(SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
};

module.exports = handleError;
