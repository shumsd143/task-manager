const {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../services/task.service");
const { validateTask } = require("../utils");

async function getTaskById(req, res) {
  const { id } = req.params;
  try {
    const task = await getTask(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllTasks(req, res) {
  try {
    const tasks = await getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createNewTask(req, res) {
  const task = req.body;
  try {
    if (validateTask(task).error) {
      return res.status(400).json({ error: "Invalid request" });
    }
    const newTask = await createTask(task);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateExistingTask(req, res) {
  const { id } = req.params;
  const updatedTask = req.body;
  try {
    if (validateTask(updatedTask).error) {
      return res.status(400).json({ error: "Invalid request" });
    }
    const task = await updateTask(id, updatedTask);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteTaskById(req, res) {
  const { id } = req.params;
  try {
    const deletedTask = await deleteTask(id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getTaskById,
  getAllTasks,
  createNewTask,
  updateExistingTask,
  deleteTaskById,
};
