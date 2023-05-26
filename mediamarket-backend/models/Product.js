const mongoose = require("mongoose");
require("mongoose-double")(mongoose);

const SchemaTypes = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxlength: 200,
    },
    price: {
      type: SchemaTypes.Double,
      required: [true, "Please provide product price"],
      default: 0,
    },
    images: {
      type: [String],
      required: false,
      default: [],
    },
    videos: {
      type: [String],
      required: false,
      default: [],
    },
    albums: {
      type: [String],
      required: false,
      default: [],
    },
    folders: {
      type: [String],
      required: false,
      default: [],
    },
    categories: {
      type: [String],
      required: false,
      default: [],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
