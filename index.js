const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/user");
const ProductsRoute = require("./routes/product");
const CartRoute = require("./routes/cart");
const OrderRoute = require("./routes/order");


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
app.use("/api/users", usersRoute);
app.use("/api/products", ProductsRoute);
app.use("/api/carts", CartRoute);
app.use("/api/orders", OrderRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log("backend server Running");
});
