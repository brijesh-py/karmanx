class HttpError extends Error {
  constructor({ message = "An error occurred", statusCode = 400, error }) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}
const errorHandler = async (res, func) => {
  try {
    await func();
  } catch (error) {
    if (error instanceof HttpError) {
      const err = error?.error;
      return res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        error: err,
      });
    }
    console.log(error);
    res.status(500).json({
      status: 500,
      message: "An unexpected error occurred",
    });
  }
};

module.exports = { HttpError, errorHandler };
