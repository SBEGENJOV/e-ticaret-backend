const express = require("express");
const mongoose = require("mongoose");
const app = express();
const mainRoute = require("./routes/index.js");
const cors = require("cors");
const port = 5000;
const dotenv = require("dotenv");
const logger = require("morgan");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    this.emit(error);
  }
};
//middleware
app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use("/api", mainRoute);

app.listen(port, () => {
  connect();
  console.log(`Sunucu ${port} portunda çalışıyor`);
});
