class HttpError extends Error {
  constructor({ status = 400, message = "An error occurred" }) {
    super(message);
    this.status = status;
  }
}

const errorHandler = async (res, func) => {
  try {
    await func();
  } catch (error) {
    if (error instanceof HttpError) {
      return res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    }
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "An unexpected error occurred",
    });
  }
};

module.exports = { HttpError, errorHandler };
