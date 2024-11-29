const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Routers
const activityRouter = express.Router();

// Middlewares
app.use(cors());
app.use("/activities", activityRouter);

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

// Dummy Data
const activities = [
  { activityId: 1, type: "Running", duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: "Swimming", duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: "Cycling", duration: 60, caloriesBurned: 500 },
];

// Utils
function addActivity(activityArr, newActivity) {
  const activityCopy = structuredClone(activityArr);
  activityCopy?.push(newActivity);
  return activityCopy;
}

function sortActivity(activityArr, key, isAscend = true) {
  if (isAscend) {
    return activityArr?.sort((a1, a2) => a1[key] - a2[key]);
  }
  return activityArr?.sort((a1, a2) => a2[key] - a1[key]);
}

function filterActivity(activityArr, key, value, isMatch = true) {
  if (isMatch) {
    return activityArr?.filter((a) => a[key] == value);
  }
  return activityArr?.filter((a) => a[key] != value);
}

function getTotalBurnedCalories(activityArr) {
  let totalCalories = 0;
  activityArr?.forEach((element) => {
    totalCalories += element?.caloriesBurned;
  });
  return totalCalories;
}

function updateActivity(activityArr, key1, value, values) {
  return activityArr?.map((a) => (a[key1] == value ? { ...a, ...values } : a));
}

// Routes
// Endpoint 1: Add an Activity
activityRouter.get(
  "/add",
  validateQuery(
    { q: "activityId", t: "int" },
    { q: "type" },
    { q: "duration", t: "int" },
    { q: "caloriesBurned", t: "int" }
  ),
  (req, res) => {
    const activityId = parseInt(req.query?.activityId);
    const type = req.query?.type;
    const duration = parseInt(req.query?.duration);
    const caloriesBurned = parseInt(req.query?.caloriesBurned);

    errorHandler(res, () => {
      const newActivity = { activityId, type, duration, caloriesBurned };

      const addedActivity = addActivity(activities, newActivity);
      res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTP_STATUS_CODES?.RESPONSE_OK,
        activities: addedActivity,
      });
    });
  }
);

// Endpoint 2: Sort Activities by Duration
activityRouter.get("/sort-by-duration", (req, res) => {
  errorHandler(res, () => {
    const sortedActivities = sortActivity(activities, "duration");
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      activities: sortedActivities,
    });
  });
});

// Endpoint 3: Filter Activities by Type
activityRouter.get(
  "/filter-by-type",
  validateQuery({ q: "type" }),
  (req, res) => {
    const type = req.query?.type;

    errorHandler(res, () => {
      const addedActivity = filterActivity(activities, "type", type);
      res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTP_STATUS_CODES?.RESPONSE_OK,
        activities: addedActivity,
      });
    });
  }
);

// Endpoint 4: Calculate Total Calories Burned
activityRouter.get("/total-calories", (req, res) => {
  errorHandler(res, () => {
    const totalCaloriesBurned = getTotalBurnedCalories(activities);
    res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
      status: HTTP_STATUS_CODES?.RESPONSE_OK,
      totalCaloriesBurned,
    });
  });
});

// Endpoint 5: Update Activity Duration by ID
activityRouter.get(
  "/update-duration",
  validateQuery({ q: "activityId", t: "int" }, { q: "duration", t: "int" }),
  (req, res) => {
    const activityId = parseInt(req.query?.activityId);
    const duration = parseInt(req.query?.duration);

    errorHandler(res, () => {
      const updatedActivity = updateActivity(
        activities,
        "activityId",
        activityId,
        { duration }
      );
      res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTP_STATUS_CODES?.RESPONSE_OK,
        activities: updatedActivity,
      });
    });
  }
);

// Endpoint 6: Delete Activity by ID
activityRouter.get(
  "/delete",
  validateQuery({ q: "activityId", t: "int" }),
  (req, res) => {
    const activityId = parseInt(req.query?.activityId);

    errorHandler(res, () => {
      const filteredActivity = filterActivity(
        activities,
        "activityId",
        activityId,
        false
      );
      res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTP_STATUS_CODES?.RESPONSE_OK,
        activities: filteredActivity,
      });
    });
  }
);

// Endpoint 7: Delete Activities by Type
activityRouter.get(
  "/delete-by-type",
  validateQuery({ q: "type" }),
  (req, res) => {
    const type = req.query?.type;
    errorHandler(res, () => {
      const filteredActivity = filterActivity(activities, "type", type, false);
      res.status(HTTP_STATUS_CODES?.RESPONSE_OK).json({
        status: HTTP_STATUS_CODES?.RESPONSE_OK,
        activities: filteredActivity,
      });
    });
  }
);

app.listen(PORT, () => {
  console.warn(`Server is running on port ${PORT}`);
});
