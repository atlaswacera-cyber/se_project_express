const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");
const NotFoundError = require("../errors/not-found-error");
const {
  validateCreateUserBody,
  validateLoginBody,
} = require("../middlewares/validation");

router.post("/signin", validateLoginBody, login);
router.post("/signup", validateCreateUserBody, createUser);
router.use("/items", clothingItemRouter);
router.use("/users", auth, userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
