const fs = require("fs");
const path = require("path");

const { tasks } = require("../../task.json");

async function getTask(id) {
  return tasks.find((task) => task.id == id);
}

async function getTasks() {
  return tasks;
}

async function createTask(task) {
  tasks.push(task);
  await updateTasksFile(tasks);
  return task;
}

async function updateTask(id, updatedTask) {
  const index = tasks.findIndex((task) => task.id == id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTask };
    await updateTasksFile(tasks);
    return tasks[index];
  }
  return null;
}

async function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id == id);
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1);
    await updateTasksFile(tasks);
    return deletedTask[0];
  }
  return null;
}

function updateTasksFile(tasks) {
  const filePath = path.resolve(__dirname, "../../updated_task.json");
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify({ tasks }), (err) => {
      if (err) {
        console.log(err, 40);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = { getTask, getTasks, createTask, updateTask, deleteTask };
