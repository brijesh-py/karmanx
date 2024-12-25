const validateToken = (req, res, next) => {
  const access_token = req.cookies.access_token;
  if (!access_token) {
    return res.status(401).send("Access denied");
  }

  next();
};

module.exports = { validateToken };
