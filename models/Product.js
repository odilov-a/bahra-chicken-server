const mongoose = require("mongoose");
const CHICKENS_TYPE_ENG = ["Raw Chicken", "Half-ready food"];
const CHICKENS_TYPE_RU = ["Сырые куриные", "Полуфабрикаты"];
const CHICKENS_TYPE_UZ = ["Xom tovuq", "Yarim tayyor ovqat"];

const productSchame = new mongoose.Schema(
  {
    titleUz: {
      type: String,
      required: true,
    },
    descriptionUz: {
      type: String,
      required: true,
    },
    titleRu: {
      type: String,
      required: true,
    },
    descriptionRu: {
      type: String,
      required: true,
    },
    titleEng: {
      type: String,
      required: true,
    },
    descriptionEng: {
      type: String,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    image02: {
      type: Array,
    },
    image03: {
      type: Array,
    },
    price: {
      type: Number,
      required: true,
    },
    typeEng: {
      type: String,
      enum: CHICKENS_TYPE_ENG,
    },
    typeRu: {
      type: String,
      enum: CHICKENS_TYPE_RU,
    },
    typeUz: {
      type: String,
      enum: CHICKENS_TYPE_UZ,
    },
  },
  { timestamps: true }
);

const Products = mongoose.model("products", productSchame);
module.exports = Products;