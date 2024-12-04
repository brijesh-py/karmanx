const response = ({ res, status, message, ...args }) => {
  res.status(status).json({
    status,
    message,
    ...args,
  });
};

module.exports = response;
