// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const authRoutes = require("./routes/authRoutes");

// dotenv.config();
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use("/api/auth", authRoutes);

// // Database Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require("express");
const dotenv = require("dotenv");
// const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoute");
// const otpRoutes = require("./routes/otpRoutes"); // ✅ Import OTP Routes


// dot config
// dotenv.config({path: './config/'})
dotenv.config();

// mongoose db
connectDB();

// rest object
const app = express();

// moddlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
// app.use(colors())

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
// app.use("/api/otp", otpRoutes); // ✅ New OTP Routes

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(
    `Node Server is running in ${process.env.DEV_MODE} on PORT ${process.env.PORT}`
      .bgBlue.white
  );
});
