const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const taskRoutes = require("./routes/task");

mongoose.connect("mongodb+srv://Shahraj:" +
  "az12sx34@cluster0-9kpzp.gcp.mongodb.net/ToDoApp" +
  "?retryWrites=true&w=majority", { useNewUrlParser: true })
  .then(() => {
    console.log('connection successful :)');
  }).catch((error) => {
    console.log('could not connect!');
    console.log(error);
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
  app.use("/api/tasks", taskRoutes);

module.exports = app;
