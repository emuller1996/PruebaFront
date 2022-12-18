const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require('morgan');


const employeeRouter = require('./routers/employee.routes');



mongoose
  .connect("mongodb://127.0.0.1:27017/prueba")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });


app.use("/public", express.static("public"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));



app.use('/employee', employeeRouter);





app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  return res.status(status).send(message);
});

module.exports = app;