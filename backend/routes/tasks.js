const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getTasks, createTask, updateTask, deleteTask
} = require("../controllers/taskControllers");

router.use(auth); // all routes below are protected
router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
