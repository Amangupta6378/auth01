// auth, isStudent, isAdmin
const jwt = require("jsonwebtoken");
// require('dotenv').config();
// require('../Routes/User')

exports.auth = (req, res, next) => {
  // Extract jwt token
  //PENDING : other ways to fetch token
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing.",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);

      req.user = decode;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token.",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong, while verifying the token. ",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Students.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role is not matching. ",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Admin.",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role is not matching. ",
    });
  }
};
