const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Routers
const taskRouter = express.Router();

// Middlewares
app.use(cors());
app.use("/tasks", taskRouter);

// Constants
const HTTP_STATUS_CODES = {
  RESPONSE_OK: 200,
  BAD_REQUEST_ERROR: 400,
  INTERNAL_SERVER_ERROR: 500,
};

// Error Handler
class HttpError extends Error {
  constructor({ status, message }) {
    super(message);
    this.status = status || HTTP_STATUS_CODES?.BAD_REQUEST_ERROR;
  }
}

async function errorHandler(res, func) {
  try {
    await func();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error?.status).json({
        status: error?.status,
        message: error?.message,
      });
    } else {
      res.status(HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: error?.message || "Internal server error",
      });
    }
  }
}

// Dummy Tasks Data
const tasks = [
  { taskId: 1, text: "Fix bug #101", priority: 2 },
  { taskId: 2, text: "Implement feature #202", priority: 1 },
  { taskId: 3, text: "Write documentation", priority: 3 },
];

// Validate Query Middleware
// Validate Type function
function validateType(query, type = "string") {
  if (query === undefined || query === null) return [true, type];

  switch (type) {
    case "int":
      return [isNaN(parseInt(query)), "number"];
    case "float":
      return [isNaN(parseFloat(query)), "float"];
    default:
      return [typeof query !== "string", "string"];
  }
}

// Validate Query Middleware
function validateQuery(...queries) {
  return (req, res, next) => {
    const invalidQueries = [];

    queries.forEach(({ q, t }) => {
      const queryValue = req.query[q];
      const [isInvalid, expectedType] = validateType(queryValue, t);

      if (isInvalid) {
        invalidQueries.push({ field: q, expectedType });
      }
    });

    if (invalidQueries.length > 0) {
      const errorMessages = invalidQueries.map(
        ({ field, expectedType }) =>
          `${field} should be a valid ${expectedType}`
      );
      return res.status(400).json({
        status: 400,
        message: errorMessages.join(", "),
      });
    }

    next();
  };
}

// Utils
function addTask(taskArr, newTask) {
  const tasksCopy = structuredClone(taskArr);
  tasksCopy?.push(newTask);
  return tasksCopy;
}

function sortTasks(taskArr, key, isAscend = true) {
  if (isAscend) {
    return taskArr?.sort((t1, t2) => t1[key] - t2[key]);
  }
  return taskArr?.sort((t1, t2) => t2[key] - t1[key]);
}

function updateTask(taskArr, key1, key2, values) {
  return taskArr?.map((task) =>
    task[key1] == key2 ? { ...task, ...values } : task
  );
}

function filterTask(taskArr, key1, key2, isMatch = true) {
  if (isMatch) {
    return taskArr?.filter((task) => task[key1] == key2);
  }
  return taskArr?.filter((task) => task[key1] != key2);
}

// Routes
// Endpoint 1. Add a Task to the Task List
taskRouter.get(
  "/add",
  validateQuery(
    { q: "taskId", t: "int" },
    { q: "text" },
    { q: "priority", t: "int" }
  ),
  (req, res) => {
    const taskId = parseInt(req.query?.taskId);
    const text = req.query?.text;
    const priority = parseInt(req.query?.priority);
    errorHandler(res, async () => {
      const newTask = { taskId, text, priority };
      const updatedTasks = addTask(tasks, newTask);
      res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTP_STATUS_CODES?.RESPONSE_OK,
        tasks: updatedTasks,
      });
    });
  }
);

// Endpoint 2. Read All Tasks in the Task List
taskRouter.get("/", (req, res) => {
  errorHandler(res, () => {
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      tasks,
    });
  });
});

// Endpoint 3. Sort Tasks by Priority
taskRouter.get("/sort-by-priority", (req, res) => {
  errorHandler(res, () => {
    const sortedTasks = sortTasks(tasks, "priority");
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      tasks: sortedTasks,
    });
  });
});

// Endpoint 4. Edit Task Priority
taskRouter.get(
  "/edit-priority",
  validateQuery({ q: "taskId", t: "int" }, { q: "priority", t: "int" }),
  (req, res) => {
    const taskId = parseInt(req.query?.taskId);
    const priority = parseInt(req.query?.priority);
    errorHandler(res, () => {
      const updatedTasks = updateTask(tasks, "taskId", taskId, { priority });
      res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTP_STATUS_CODES?.RESPONSE_OK,
        tasks: updatedTasks,
      });
    });
  }
);

// Endpoint 5. Edit/Update Task Text
taskRouter.get(
  "/edit-text",
  validateQuery({ q: "taskId", t: "int" }, { q: "text" }),
  (req, res) => {
    const taskId = parseInt(req.query?.taskId);
    const text = req.query?.text;
    errorHandler(res, () => {
      const updatedTasks = updateTask(tasks, "taskId", taskId, { text });
      res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTP_STATUS_CODES?.RESPONSE_OK,
        tasks: updatedTasks,
      });
    });
  }
);

// Endpoint 6. Delete a Task from the Task List
taskRouter.get(
  "/delete",
  validateQuery({ q: "taskId", t: "int" }),
  (req, res) => {
    const taskId = parseInt(req.query?.taskId);
    errorHandler(res, () => {
      const deletedTasks = filterTask(tasks, "taskId", taskId, false);
      res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTP_STATUS_CODES?.RESPONSE_OK,
        tasks: deletedTasks,
      });
    });
  }
);

// Endpoint 7. Filter Tasks by Priority
taskRouter.get(
  "/filter-by-priority",
  validateQuery({ q: "priority", t: "int" }),
  (req, res) => {
    const priority = parseInt(req.query?.priority);
    errorHandler(res, () => {
      const filteredTasks = filterTask(tasks, "priority", priority);

      res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTP_STATUS_CODES?.RESPONSE_OK,
        tasks: filteredTasks,
      });
    });
  }
);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
