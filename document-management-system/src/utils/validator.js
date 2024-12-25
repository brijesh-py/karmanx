const { HttpError, errorHandler } = require("./error-handler");
const validate = (req, res, queries, prop) => {
  let invalidQuery = "";
  for (const query in queries) {
    const key = queries[query][0];
    const type = queries[query][1];
    const len = queries[query][2];
    const value = req[prop][key];
    if (!value || typeof value !== type || value.length < len) {
      invalidQuery = queries[query];
      break;
    }
  }
  if (invalidQuery) {
    const lenMessage = invalidQuery[2]
      ? ` and must be at least ${invalidQuery[2]} characters long`
      : "";
    throw new HttpError({
      res,
      message: `${invalidQuery[0]} ${prop} is required and must be of type ${invalidQuery[1]}${lenMessage}`,
    });
  }
};
const validator = (queries, prop = "body") => {
  return (req, res, next) => {
    errorHandler(res, () => {
      validate(req, res, queries, prop);
      next();
    });
  };
};

module.exports = validator;
