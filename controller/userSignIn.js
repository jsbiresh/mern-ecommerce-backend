const userModel = require("../models/userModel");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error(`Please provide Email.`);
    }
    if (!password) {
      throw new Error(`Please provide Password.`);
    }

    // =====================================
    // check if user exists in database or not
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new Error("User Not Found!");
    }
    // check password with bcrypt
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: "8h",
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
      };
      // send response to user's browser
      res.cookie("token", token, tokenOption).json({
        message: "Login Successful",
        data: token,
        success: true,
        error: false,
      });
    } else {
      throw new Error("Provide Correct Password.");
    }

    // =====================================
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;
