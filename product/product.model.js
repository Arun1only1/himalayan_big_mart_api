import mongoose from "mongoose";

// set rule
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 55,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
  brand: {
    type: String,
    trim: true,
    required: true,
    maxlength: 30,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 200,
    maxlength: 1000,
  },
  image: {
    type: String,
    required: false,
    default: null,
  },
});

// create table
const Product = mongoose.model("Product", productSchema);

export default Product;
