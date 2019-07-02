let express = require("express");
let router = express.Router();
let config = require("../config/config");
let validateEmail = require("../validation/email");
var ObjectId = require("mongodb").ObjectID;
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

router.post("/userSignIn", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const provider = req.body.provider;

  validateEmail(email).then(user => {
    if (user) {
      if (provider == "none") {
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if (isMatch) {
            console.log("User Logged In Successfully !");
            res.status(200).send({
              isValid: true,
              message: "User Logged In Successfully !"
            });
          } else {
            res.status(200).send({
              isValid: false,
              message: "Incorrect Username or Password !"
            });
          }
        });
      } else if (provider == "GOOGLE" || provider == "FACEBOOK") {
        res.status(200).send({
          isValid: true,
          message: "User Logged In Successfully !"
        });
      }
    } else {
      res.status(200).send({
        isValid: false,
        message: "Incorrect Username or Password !"
      });
    }
  });
});

router.post("/userSignUp", (req, res, next) => {
  const email = req.body.email;

  validateEmail(email).then(result => {
    if (result) {
      res.status(200).send({
        isValid: false,
        message: "User Already Present !"
      });
    } else {
      const userSignUp = new User(data);
      bcrypt.hash(data.password, 10, function(err, hash) {
        userSignUp.password = hash;

        userSignUp
          .save()
          .then(result => {
            res.status(201).send({
              isValid: true,
              message: "User Signed Up Successfully !"
            });
          })
          .catch(err => {
            console.log(err);
            // res.status(500).send({
            //   isValid: false,
            //   message: "Internal Server Error"
            // });
          });
      });
    }
  });
});

router.post("/getUserInfo", (req, res, next) => {
  const email = req.body.email;
  User.findOne({
    $or: [
      {
        email: email
      },
      {
        google: email
      },
      {
        facebook: email
      }
    ]
  })
    .select()
    .exec()
    .then(user => {
      console.log(user);
      // res.status(200).send(user);
    })
    .catch(err => {
      console.log(err);
      // res.status(500);
    });
});

module.exports = router;
