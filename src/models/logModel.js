const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  photoUrl: String,
  activity: { type: String, required: true }
});

module.exports = mongoose.model("log", LogSchema);
