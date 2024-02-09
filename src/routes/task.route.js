const {
  createNewTask,
  deleteTaskById,
  getAllTasks,
  getTaskById,
  updateExistingTask,
} = require("../controllers/task.controller");

const router = require("express").Router();

router.post("", createNewTask);
router.get("", getAllTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateExistingTask);
router.delete("/:id", deleteTaskById);

module.exports = router;
