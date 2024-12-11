//  Validate Input Middleware
const validateInput = (queries) => {
  return (req, res, next) => {
    let invalidQuery;
    for (const query in queries) {
      const arr = queries[query];
      const key = req.body[arr[0]];
      if (!key || typeof key !== (arr[1] || "string") || key?.length < arr[2]) {
        invalidQuery = arr;
      }
    }
    if (invalidQuery) {
      const lengthMessage = invalidQuery[2]
        ? ` with a length of at least ${invalidQuery[2]}`
        : "";
      return res.status(400).json({
        status: 400,
        message: `${invalidQuery[0]} is required and should be a ${invalidQuery[1] || "string"}${lengthMessage}`,
      });
    }
    next();
  };
};

// HTTPS STATUS CODES RESPONSE
const HTTP_STATUS_CODES = {
  OK: 200,
  CREATE: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

class HttpError extends Error {
  constructor({ status, message = "An error occurred" }) {
    super(message);
    this.status = status || HTTP_STATUS_CODES?.BAD_REQUEST_ERROR;
  }
}
const errorHandler = async (res, func) => {
  try {
    await func();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR).json({
        status: HTTP_STATUS_CODES?.INTERNAL_SERVER_ERROR,
        message: "An unexpected error occurred",
      });
    }
  }
};

module.exports = {
  validateInput,
  HTTP_STATUS_CODES,
  HttpError,
  errorHandler,
};
