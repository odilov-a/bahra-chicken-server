const mongoose = require("mongoose");
const CHICKENS_TYPE = ["crude", "halfReady"];
const productSchame = new mongoose.Schema(
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
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: CHICKENS_TYPE,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("products", productSchame);
module.exports = Products;