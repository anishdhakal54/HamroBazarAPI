const path = require("path");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../auth");
const Product = require("../models/product");

router.get("/", (req, res) => {
  Product.find({}, (err, allprod) => {
    if (err) {
      let err = new Error("No produt found !");
      err.status = 401;
      return next(err);
    }
    // console.log(allprod);
    res.json({ allprod });
  });
});

router.post("/new", auth.verifyUser, (req, res) => {
  const { image } = req.files;
  image.mv(
    path.resolve(__dirname, "..", "public/product", image.name),
    errors => {
      const user = Product.create({
        name: req.body.name,
        image: `/product/${image.name}`,
        price: req.body.price
      });
      res.json({ status: "Product added!" });
    }
  );
});

module.exports = router;
