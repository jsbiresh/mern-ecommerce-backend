async function userLogout(req, res) {
  try {
    res.clearCookie("token");

    res.json({
      message: "Logged Out Successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogout;

// ==========================
// async function userLogout(req, res) {
//   try {
//     // Clear the cookie named "token"
//     res.clearCookie("token", {
//       httpOnly: true, // Ensure it matches the settings used when setting the cookie
//       secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS
//       sameSite: "Strict", // or 'Lax', depending on your needs
//     });

//     res.json({
//       message: "Logged Out Successfully",
//       error: false,
//       success: true,
//       data: [], // Assuming you want to send an empty array for data
//     });
//   } catch (error) {
//     res.status(500).json({
//       // Use status code 500 for server errors
//       message: error.message || "An error occurred during logout",
//       error: true,
//       success: false,
//     });
//   }
// }

// module.exports = userLogout;
// ======================
