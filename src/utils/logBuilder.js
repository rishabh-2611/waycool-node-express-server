const Logs = require("../models/logModel");
const User = require("../models/userModel");
var ObjectId = require("mongodb").ObjectID;

function getDateTime() {
  var today = new Date();

  var date =
    ("0" + today.getDate()).slice(-2) +
    "-" +
    ("0" + today.getMonth()).slice(-2) +
    "-" +
    ("0" + today.getFullYear()).slice(-2);

  var time =
    ("0" + today.getHours()).slice(-2) +
    ":" +
    ("0" + today.getMinutes()).slice(-2) +
    ":" +
    ("0" + today.getSeconds()).slice(-2);

  return { date, time };
}

function accountCreated(user) {
  const log = new Logs({
    name: user.name,
    email: user.email,
    photoUrl: user.photoUrl
  });
  const today = getDateTime();
  log.date = today.date;
  log.time = today.time;
  log.activity = "Account Created";

  return log
    .save()
    .then(result => {
      console.log("Account Created");
    })
    .catch(err => {
      console.log(err);
    });
}

function loginWithEmail(user) {
  const log = new Logs({
    name: user.name,
    email: user.email,
    photoUrl: user.photoUrl
  });
  const today = getDateTime();
  log.date = today.date;
  log.time = today.time;
  log.activity = "Email Sign In";

  return log
    .save()
    .then(result => {
      console.log("Email Sign In");
    })
    .catch(err => {
      console.log(err);
    });
}

function loginWithGoogle(user) {
  const log = new Logs({
    name: user.name,
    email: user.email,
    photoUrl: user.photoUrl
  });
  const today = getDateTime();
  log.date = today.date;
  log.time = today.time;
  log.activity = "Google Sign In";

  return log
    .save()
    .then(result => {
      console.log("Google Sign In");
    })
    .catch(err => {
      console.log(err);
    });
}

function loginWithFacebook(user) {
  const log = new Logs({
    name: user.name,
    email: user.email,
    photoUrl: user.photoUrl
  });
  const today = getDateTime();
  log.date = today.date;
  log.time = today.time;
  log.activity = "Facebook Sign In";

  return log
    .save()
    .then(result => {
      console.log("Facebook Sign In");
    })
    .catch(err => {
      console.log(err);
    });
}

function accountEdited(_id) {
  const today = getDateTime();
  return User.findById(ObjectId(_id))
    .select()
    .exec()
    .then(user => {
      const log = new Logs({
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl
      });
      log.date = today.date;
      log.time = today.time;
      log.activity = "Account Edited";
      log
        .save()
        .then(result => {
          console.log("Account Edited");
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}

function accountLinkedWithGoogle(_id) {
  const today = getDateTime();
  return User.findById(ObjectId(_id))
    .select()
    .exec()
    .then(user => {
      const log = new Logs({
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl
      });
      log.date = today.date;
      log.time = today.time;
      log.activity = "Account linked with Google";
      log
        .save()
        .then(result => {
          console.log("Account linked with Google");
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}

function accountLinkedWithFacebook(_id) {
  const today = getDateTime();
  return User.findById(ObjectId(_id))
    .select()
    .exec()
    .then(user => {
      const log = new Logs({
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl
      });
      log.date = today.date;
      log.time = today.time;
      log.activity = "Account linked with Facebook";
      log
        .save()
        .then(result => {
          console.log("Account linked with Facebook");
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}

function accountDeleted(_id) {
  const today = getDateTime();
  return User.findById(ObjectId(_id))
    .select()
    .exec()
    .then(user => {
      const log = new Logs({
        name: user.name,
        email: user.email,
        photoUrl: user.photoUrl
      });
      log.date = today.date;
      log.time = today.time;
      log.activity = "Account Deleted";
      log
        .save()
        .then(result => {
          console.log("Account Deleted");
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  accountCreated,
  loginWithEmail,
  loginWithGoogle,
  loginWithFacebook,
  accountEdited,
  accountLinkedWithGoogle,
  accountLinkedWithFacebook,
  accountDeleted
};
