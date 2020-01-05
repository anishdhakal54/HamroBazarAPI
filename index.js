const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const userRouter = require("./routes/users");
const dotenv = require("dotenv").config();
const auth = require("./auth");
const productRoute = require("./routes/product");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(
    db => {
      console.log("Successfully connected to MongodB server");
    },
    err => console.log(err)
  );

app.use(fileUpload());
app.use("/users", userRouter);
app.use("/products", productRoute);
app.use(auth.verifyUser);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.statusCode = 500;
  res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
  console.log(`App is running at localhost:${process.env.PORT}`);
});
