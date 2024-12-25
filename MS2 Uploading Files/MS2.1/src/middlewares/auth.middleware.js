const jwt = require("jsonwebtoken");

const authJWT = async (req, res, next) => {
  const token =
    req.cookies?.token || req.headers?.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }
    try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
};

module.exports = authJWT;
