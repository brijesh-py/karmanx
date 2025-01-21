require("dotenv").config()
const express = require("express");
const cors = require("cors");
const tasks = require("./data");

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors());
app.use(express());

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Mini Jira App");
});

const errorResponse = (field) => {
  return res.status(400).json({
    status: 400,
    message: `${field} name is required`,
  });
};

// Controllers
// View All Tasks for a Project:
const getTasksByProjectName = (req, res) => {
  const projectName = req.params.projectName;
  try {
    if (typeof projectName !== "string" || !projectName) {
      res.status(400).json({
        status: 400,
        message: "Project name is required",
      });
    }
    const filteredTasks = tasks?.filter(
      (task) =>
        task.project.toLocaleLowerCase() === projectName.toLocaleLowerCase()
    );

    res.status(200).json({
      status: 200,
      tasks: filteredTasks,
      tasks_count: filteredTasks?.length,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error?.message ?? "An unexpected error occurred",
    });
  }
};

// Sort Tasks by Project Size:
const getSortedTaskByProjectSize = (req, res) => {
  try {
    const sortedTasks = tasks?.sort((a, b) => b.project - a.project);
    res.status(200).json({
      status: 200,
      tasks: sortedTasks,
      tasks_count: sortedTasks?.length,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error?.message ?? "An unexpected error occurred",
    });
  }
};

// Validate new task required fields
const newTaskValidator = (req, res, next) => {
  const { title, project, assignedTo, priority, status } = req.body;
  if (typeof title !== "string" || !title) {
    return errorResponse("title");
  }
  if (typeof project !== "string" || !project) {
    return errorResponse("project");
  }
  if (typeof assignedTo !== "string" || !assignedTo) {
    return errorResponse("assignedTo");
  }
  if (typeof priority !== "string" || !priority) {
    return errorResponse("priority");
  }
  if (typeof status !== "string" || !status) {
    return errorResponse("status");
  }
  next();
};

// Add a New Task:
const addNewTask = (req, res) => {
  const { title, project, assignedTo, priority, status } = req.body;
  try {
    const task = {
      id: tasks?.length + 1,
      title,
      project,
      assignedTo,
      priority,
      status,
    };
    tasks.push(task);
    res.status(201).json({
      status: 201,
      task,
      message: "New Task added successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error?.message ?? "An unexpected error occurred",
    });
  }
};

// Routes
app.get("/projects/:projectName/tasks", getTasksByProjectName);
app.get("/projects/sort/by-task-size", getSortedTaskByProjectSize);
app.post("/tasks", addNewTask);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
