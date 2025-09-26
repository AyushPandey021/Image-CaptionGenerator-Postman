const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const findUser = await userModel.findOne({ _id: decoded.id });

    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = findUser;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authMiddleware;
