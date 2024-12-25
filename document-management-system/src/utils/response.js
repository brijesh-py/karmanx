const response = ({ res, status = 200, message = "Success", ...data }) => {
  return res.status(status).json({
    status,
    message,
    ...data,
  });
};

module.exports = response;
