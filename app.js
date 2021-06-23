var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

//Process Configuration File
require("dotenv").config();

// Database Connection
require("./config/database");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', indexRouter);
app.use('*', (req, res, err) => {
  if (err) console.error(err)
  res.send("Welcome to Workers Backend....s");
})

module.exports = app;