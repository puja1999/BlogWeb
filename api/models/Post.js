const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true, // as i don't want any post with same title
    },
    desc: {
      type: String,
      required: true,
    },
    photo: { // photograph to be posted
      type: String,
      required: false, // so that we can delete it
    },
    username: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);