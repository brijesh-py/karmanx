const { HttpError, errorHandler } = require("./error-handler.js");

const valueValidator = (req, obj, prop) => {
  let invalidQuery = "";
  for (const query in obj) {
    const arr = obj[query];
    const key = req[prop][arr[0]];
    if (!key || typeof key !== (arr[1] || "string") || key?.length < arr[2]) {
      invalidQuery = arr;
    }
  }

  if (invalidQuery) {
    let lengthMessage = invalidQuery[2]
      ? ` must be at least ${invalidQuery[2]} characters long.`
      : "";
    throw new HttpError({
      status: 400,
      message: `${invalidQuery[0]} is required and should be a ${invalidQuery[1]}${lengthMessage}`,
    });
  }
};

const validator = (obj, prop = "body") => {
  return (req, res, next) => {
    errorHandler(res, () => {
      valueValidator(req, obj, prop);
      next();
    });
  };
};


module.exports = validator;
