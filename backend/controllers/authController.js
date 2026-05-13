const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// REGISTER USER
const registerUser = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECK USER
    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.json({
        success: false,
        message: "User already exists",
      });

    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
      success: true,
      message: "Registration Successful 🚀",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};


// LOGIN USER
const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body;

    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {

      return res.json({
        success: false,
        message: "User not found",
      });

    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.json({
        success: false,
        message: "Invalid Password",
      });

    }

    // JWT TOKEN
    const token = jwt.sign(
      {
        id: user._id,
      },
      "trusthire-secret-key",
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      message: "Login Successful 🚀",
      token,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }

};


module.exports = {
  registerUser,
  loginUser,
};