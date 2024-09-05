const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        data: [],
        message: "User Not Logged In.",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.log("error", err);
        return res.status(401).json({
          data: [],
          message: "Invalid TOKEN",
          error: true,
          success: false,
        });
      }
      //   console.log("DECODED : ", decoded);
      req.userId = decoded?._id; // Ensure req.user is properly initialized
      //   console.log("User ID:", req.userId);
    });

    // MOVE ON
    next();
  } catch (err) {
    res.status(400).json({
      data: [],
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
