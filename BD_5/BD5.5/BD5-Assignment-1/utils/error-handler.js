const { HTTPS_STATUS_CODES } = require("../constants");

class HttpError extends Error {
  constructor({
    status = HTTPS_STATUS_CODES.BAD_REQUEST,
    message = "An error occurred",
  }) {
    super(message);
    this.status = status;
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
      console.log(error)
      res.status(HTTPS_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        status: HTTPS_STATUS_CODES.INTERNAL_SERVER_ERROR,
        message: "An unexpected error occurred",
      });
    }
  }
};

module.exports = { HttpError, errorHandler };
