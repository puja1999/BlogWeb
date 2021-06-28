const mongoose = require("mongoose");

// creating users Schema object
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // as noOne will create username with same username
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: { // to add profilePic for each user
      type: String, // as it includes image url
      default: "", // firstly no image will be there, its optional
    },
  },
  { timestamps: true } // create updated at times
);

// finally export this schema, model name will be "User" and schema name is UserSchema
module.exports = mongoose.model("User", UserSchema);