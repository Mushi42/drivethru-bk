const express = require("express");
const logger = require("morgan");
const uplodeFile = require("express-fileupload");
const path = require("path");
const cors = require('cors');
require("dotenv").config();




require('./config/dbConfig');

const indexRouter = require("./router");

const app = express();

require("./config/dbConfig");

app.use(uplodeFile());
app.use(cors())
app.use(logger("dev"));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api/v1", indexRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    errorCode: 404,
    message: "End Point Not Found!"
  });
});

module.exports = app;

// https://www.getpostman.com/collections/f181800672b248726f3f