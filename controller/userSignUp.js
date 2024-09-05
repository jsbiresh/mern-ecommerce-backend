const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

async function userSignUpController(req, res) {
  const { name, email, password } = req.body;

  try {
    // check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists!",
        success: false,
        error: true,
      });
    }

    // Validate Input
    if (!name) {
      throw new Error(`Please provide Name.`);
    }
    if (!email) {
      throw new Error(`Please provide Email.`);
    }
    if (!password) {
      throw new Error(`Please provide Password.`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (!hashPassword) {
      throw new Error(`Something wrong with HashPassword.`);
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();
    // console.log("User Created", saveUser);
    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Created Successfully",
    });
    // ========= SAVE USER ===================
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
}

module.exports = userSignUpController;
