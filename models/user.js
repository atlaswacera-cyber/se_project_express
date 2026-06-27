const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, { require_protocol: true }),
      message: "You must enter a valid URL",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
