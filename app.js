const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/wtwr_db");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
