const mongoose = require("mongoose");
const youtubeSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Youtube = mongoose.model("youtube", youtubeSchema);
module.exports = Youtube;