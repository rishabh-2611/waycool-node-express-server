let express = require("express");
let router = express.Router();
let Email = require("../validation/email");
let Logs = require("../utils/logBuilder");
var ObjectId = require("mongodb").ObjectID;
const User = require("../models/userModel");
const LogsModel = require("../models/logModel");
const bcrypt = require("bcrypt");

router.post("/userSignIn", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const provider = req.body.provider;

  Email.validateEmail(email).then(user => {
    if (user) {
      if (provider == "none") {
        bcrypt.compare(password, user.password, function(err, isMatch) {
          if (isMatch) {
            Logs.loginWithEmail(user).then(result => {
              res.status(200).send({
                isValid: true,
                message: "User Logged In Successfully !"
              });
            });
          } else {
            res.status(200).send({
              isValid: false,
              message: "Incorrect Username or Password !"
            });
          }
        });
      } else if (provider == "GOOGLE" || provider == "FACEBOOK") {
        if (provider == "GOOGLE") {
          Logs.loginWithGoogle(user).then(result => {
            res.status(200).send({
              isValid: true,
              message: "User Logged In Successfully !"
            });
          });
        } else if (provider == "FACEBOOK") {
          Logs.loginWithFacebook(user).then(result => {
            res.status(200).send({
              isValid: true,
              message: "User Logged In Successfully !"
            });
          });
        }
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

  Email.validateEmail(email).then(result => {
    if (result) {
      res.status(200).send({
        isValid: false,
        message: "User Already Present !"
      });
    } else {
      const userSignUp = new User(req.body);
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        userSignUp.password = hash;

        userSignUp
          .save()
          .then(result => {
            Logs.accountCreated(req.body).then(result => {
              res.status(201).send({
                isValid: true,
                message: "User Signed Up Successfully !"
              });
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
  Email.validateEmail(email)
    .then(user => {
      res.status(200).send(user);
    })
    .catch(err => {
      console.log(err);
    });
});

router.post("/editUserInfo", (req, res) => {
  const _id = req.body._id;
  const dob = req.body.dob;
  const gender = req.body.gender;

  User.findByIdAndUpdate(
    ObjectId(_id),
    { $set: { dob: dob, gender: gender } },
    function(err, result) {
      if (err) {
        res.status(500).send({ isValid: false });
      } else if (result) {
        Logs.accountEdited(_id).then(result => {
          res.status(200).send({
            isValid: true,
            message: "User Edited Successfully"
          });
        });
      }
    }
  );
});

router.post("/linkWithGoogle", (req, res) => {
  const _id = req.body._id;
  const google = req.body.google;

  Email.validateEmailSelfExcluding(_id, google)
    .then(result => {
      if (result) {
        res.status(200).send({
          isValid: false,
          message: "This email is already linked with some other account !"
        });
      } else {
        User.findByIdAndUpdate(
          ObjectId(_id),
          { $set: { google: google } },
          function(err, result) {
            if (err) {
              res.status(500).send({ isValid: false });
            } else if (result) {
              Logs.accountLinkedWithGoogle(_id).then(result => {
                res.status(200).send({
                  isValid: true,
                  message: "User Linked with Google"
                });
              });
            }
          }
        );
      }
    })
    .catch(err => {
      console.log(err);
      // res.status(500);
    });
});

router.post("/linkWithFacebook", (req, res) => {
  const _id = req.body._id;
  const facebook = req.body.facebook;

  Email.validateEmailSelfExcluding(_id, facebook)
    .then(result => {
      if (result) {
        res.status(200).send({
          isValid: false,
          message: "This email is already linked with some other account !"
        });
      } else {
        User.findByIdAndUpdate(
          ObjectId(_id),
          { $set: { facebook: facebook } },
          function(err, result) {
            if (err) {
              res.status(500).send({ isValid: false });
            } else if (result) {
              Logs.accountLinkedWithFacebook(_id).then(result => {
                res.status(200).send({
                  isValid: true,
                  message: "User Linked with Facebook"
                });
              });
            }
          }
        );
      }
    })
    .catch(err => {
      console.log(err);
      // res.status(500);
    });
});

router.post("/deleteAccount", (req, res, next) => {
  const _id = req.body._id;
  Logs.accountDeleted(_id).then(result => {
    User.findByIdAndDelete(ObjectId(_id))
      .select()
      .exec()
      .then(result => {})
      .catch(err => {
        console.log(err);
      });
  });
});

module.exports = router;