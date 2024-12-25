class HttpError extends Error {
  constructor({ message = "Something went wrong", statusCode = 400 }) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHandler = async (res, func) => {
  try {
    await func();
  } catch (error) {
    if (error instanceof HttpError) {
      return res
        .status(error.statusCode)
        .json({ status: error.statusCode, message: error.message });
    } else {
      console.log(error)
      return res.status(error?.status || 500).json({
        status: error?.status || 500,
        message: error?.message || "An unexpected error occurred",
      });
    }
  }
};

module.exports = { HttpError, errorHandler };
