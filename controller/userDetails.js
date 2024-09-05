const userModel = require("../models/userModel");

async function userDetailsController(req, res) {
  try {
    // console.log("USER DETAILS CONTROLLER");
    // console.log("USER ID : ", req.userId);
    const user = await userModel.findById(req.userId);
    // console.log(user);
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User Detail",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
