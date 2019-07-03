const User = require("../models/userModel");
var ObjectId = require("mongodb").ObjectID;

function validateEmail(email) {
  return User.findOne({
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
    .catch(err => {
      console.log(err);
    });
}

function validateEmailSelfExcluding(_id, email) {
  return User.findOne({
    _id: { $ne: ObjectId(_id) },
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
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  validateEmail,
  validateEmailSelfExcluding
};
