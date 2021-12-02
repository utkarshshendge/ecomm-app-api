const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");

dotenv.config();

const app = express();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB COnnected"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("backend server Running");
});
