const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.post("", (req, res, next) => {
  const task = new Task({
    status: req.body.status,
    task_name: req.body.task_name,
    important: req.body.important,
    timeStamp: req.body.timeStamp,
    index: req.body.index
  });
  task.save().then(result => {
    res.status(201).json({
      message: 'save success',
      data: result
    });
    console.log(result);
  }).catch(err => {
    res.status(500).json({
      message: 'server error',
      error: err
    });
  });
});


router.get("", (req,res, next) => {
  Task.find().then((result) => {
    res.status(201).json(result);
  }).catch(err => {
    res.status(500).json({
      message: 'server error',
      error: err
    });
  });

});

module.exports = router;
