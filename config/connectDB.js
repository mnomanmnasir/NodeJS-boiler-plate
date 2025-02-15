const mongoose = require("mongoose");
const colors = require("colors");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongo db ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`Mongo DB  Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
