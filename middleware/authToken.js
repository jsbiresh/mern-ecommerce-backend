async function authToken(req, res) {
  try {
    const token = req.cookies?.token || req.header;
    if (token) {
      console.log("token", token);
    } else {
      console.log("No TOKEN FOUND");
    }
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
