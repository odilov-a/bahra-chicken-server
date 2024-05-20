const mongoose = require("mongoose");
const blogSchame = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("blogs", blogSchame);
module.exports = Blogs;
