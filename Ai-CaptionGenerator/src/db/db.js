const mongoose = require("mongoose");

function connectDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("db connected");
    })
    .catch((err) => {
      console.log("db connection failed");
      console.log(err);
    });
}

module.exports = connectDB;
