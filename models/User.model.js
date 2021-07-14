const mongoose = require("mongoose");
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,

    trim: true
  },
  lastName: {
    type: String,

    trim: true

  },
  username: {
    type: String,
    trim: true,

  },
  email: {
    type: String,
    trim: true,

  },
  contact: {
    type: String,
    trim: true,
    require: true,
  },
  address: {
    type: String,
    trim: true

  },
  // geometry: { type: { type: String, default: "Point" }, coordinates: [Number] },
  profileImage: {
    type: String,
    default:
      "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png",
  },

  role: {
    type: String,
    enum: ["admin", "customer", "staff"],
    default: "customer",
  },
  nationalProfile: {},
  interNationalProfile: {},
  password: {
    type: String,

    trim: true,
    select: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  }
}, { timestamps: true });

const User = mongoose.model("users", userSchema);
module.exports = User;
