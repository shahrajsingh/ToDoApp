const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/task");

router.post("",TaskController.createTask);

router.get("",TaskController.getTasks);

router.get("/imptask",TaskController.getimptask);

router.get("/mydaytask",TaskController.getmydaytasks);

router.get("/ctask",TaskController.getCompletedTask);

router.put("", TaskController.completeTask);

router.put("/imp",TaskController.markImportant);

router.put("/nimp",TaskController.marknImportant);

module.exports = router;
