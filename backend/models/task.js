const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  status: {
    type: Boolean, required: true
  },
  task_name: {
    type: String, required: true
  },
  important: {
    type: Boolean, required: true
  },
  timeStamp: {
    type: String, required: true
  },
  date: {
    type: String, required: true
  },
  index: {
    type: Number, required: true
  },
  UserId: {
    type: String, required: true
  }
});

module.exports = mongoose.model("Task", taskSchema);
