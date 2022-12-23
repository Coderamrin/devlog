const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");

//initialize server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//connect DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB Connected successfully");
  } catch (error) {
    console.log({ message: error.message });
  }
};

mongoose.set("strictQuery", false);
connectDB();

//routes setup
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

//server setup
app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT:${process.env.PORT}`);
});
