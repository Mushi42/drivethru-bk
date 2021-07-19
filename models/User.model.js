const mongoose = require("mongoose");
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
  
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

  profileImage: {
    type: String,
    default:
      "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png",
  },

  role: {
    type: String,
    enum: ["admin", "student"],
    default: "nat_student",
  },
  nationalProfile: {},
  interNationalProfile: {},
  password: {
    type: String,
    select: false,
  }
}, { timestamps: true });

const User = mongoose.model("users", userSchema);
module.exports = User;
