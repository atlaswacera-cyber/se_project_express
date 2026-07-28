const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");
const UnauthorizedError = require("../errors/unauthorized-error");

const extractBearerToken = (authorization) =>
  authorization.replace("Bearer ", "");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Authorization required"));
  }

  req.user = payload;

  return next();
};
