const express = require("express");
const logger = require("morgan");
const uplodeFile = require("express-fileupload");
const path = require("path");
const cors = require('cors');
const fs = require('fs'); 
require("dotenv").config();

require('./config/dbConfig');
const indexRouter = require("./router");

const app = express();



app.use(uplodeFile());
app.use(cors())
app.use(logger("dev"));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.static(path.join(__dirname, 'public')));


var execPHP = require('./execphp.js')();

execPHP.phpFolder = './php';

app.use('*.php',function(request,response,next) {
	execPHP.parseFile(request.originalUrl,function(phpResult) {
		response.write(phpResult);
		response.end();
	});
});


app.get('/success', (req, res) => {
  
  res.send('Payment Success');
})

app.use("/api/v1", indexRouter);

app.use("*", (req, res) => {
  res.status(404).json({
    errorCode: 404,
    message: "End Point Not Found!"
  });
});

module.exports = app;

// https://www.getpostman.com/collections/f181800672b248726f3f