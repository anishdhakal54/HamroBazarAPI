const path = require("path");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const router = express.Router();
const auth = require("../auth");

router.post("/signup", (req, res, next) => {
  let password = req.body.password;
  bcrypt.hash(password, 10, function(err, hash) {
    if (err) {
      let err = new Error("Could not hash!");
      err.status = 500;
      return next(err);
    }
    const { image } = req.files;
    image.mv(
      path.resolve(__dirname, "..", "public/users", image.name),
      errors => {
        const user = User.create({
          name: req.body.name,
          username: req.body.username,
          password: hash,
          image: `/users/${image.name}`
        });
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });
        res.json({ status: "Signup success!", token: token });
      }
    );
  });
});

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      if (user == null) {
        let err = new Error("User not found!");
        err.status = 401;
        return next(err);
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              let err = new Error("Password does not match!");
              err.status = 401;
              return next(err);
            }
            let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.json({ status: "Login success!", token: token });
          })
          .catch(next);
      }
    })
    .catch(next);
});

router.get("/me", auth.verifyUser, (req, res, next) => {
  console.log(req.user);
  res.json({
    _id: req.user._id,
    name: req.user.name,
    username: req.user.username,
    image: req.user.image
  });
});

router.put("/me", auth.verifyUser, (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { $set: req.body }, { new: true })
    .then(user => {
      res.json({
        _id: user._id,
        name: req.body.name,
        username: user.username,
        image: user.image
      });
    })
    .catch(next);
});

module.exports = router;
