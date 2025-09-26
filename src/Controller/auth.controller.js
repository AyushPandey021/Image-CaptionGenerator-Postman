const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerController(req, res) {
  const { username, password } = req.body;
  const findUser = await userModel.findOne({ username });
  if (findUser) {
   return res.json({
      message: "User already exists",
    });
  }
  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  return res.json({
    message: "User created successfully",
  });
}

async function loginController(req, res) {
  const { username, password } = req.body;
  const findUser = await userModel.findOne({ username });
  if (!findUser) {
    return res.json({
      message: "User does not exist",
    });
  }
  const validPassword = await bcrypt.compare(password, findUser.password);
  if (!validPassword) {
    return res.json({
      message: "Invalid password",
    });
  }
  const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  return res.json({
    message: "Login successful",
  });
}

module.exports = {
  registerController,
  loginController,
};
