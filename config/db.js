require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB(params) {
  const dbURI = process.env.MONGODB_URI;
  if (!dbURI) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }

  try {
    await mongoose.connect(dbURI);
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectDB;
