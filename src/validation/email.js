const User = require("../models/userModel");

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

module.exports = validateEmail;