const Users = require("../models/User.js");
const { sign } = require("../utils/jwt.js");
const bcrypt = require("bcrypt");

exports.getMe = async (req, res) => {
  try {
    const { userId } = req.headers;
    const findUser = await Users.findById(userId);
    if (!findUser) {
      return res.status(404).json({
        message: "User Not Found!",
      });
    }
    return res.json({
      data: {
        token: sign(findUser._id),
        username: findUser.username,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new Users({
      username: req.body.username,
      password: hashedPassword,
    });
    const user = await newUser.save();
    return res.json({
      message: "User created",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const findUser = await Users.findOne({ username });
    if (!findUser) {
      return res.status(404).json({
        message: "User Not Found!",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
    return res.json({
      data: {
        token: sign(findUser._id.toString()),
        username: findUser.username,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.headers;
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        username: req.body.username,
        password: req.body.password,
      },
      {
        new: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    return res.json({
      message: "User updated",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};