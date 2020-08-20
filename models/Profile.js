const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  phone: {
    type: Number,
    maxlength: 10,
  },
  address: {
    type: String,
  },
  skills: {
    type: [String],
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
