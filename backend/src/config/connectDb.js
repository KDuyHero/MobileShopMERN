const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("connected!");
  } catch (error) {
    console.log("fail to connect db with error: " + error);
  }
};

module.exports = connectDb;
