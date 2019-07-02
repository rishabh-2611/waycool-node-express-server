const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: String,
  gender: String,
  email: { type: String, required: true },
  isManualSignUp: { type: Boolean, required: true },
  isGoogleSignUp: { type: Boolean, required: true },
  isFacebookSignUp: { type: Boolean, required: true },
  photoUrl:  String,
  google: String,
  facebook: String,
  isActive: { type: Boolean, required: true },
  userId: String,
  startDate: { type: String, required: true },
  endDate: String,
  password: { type: String, required: true }
});

module.exports = mongoose.model("user", UserSchema);
