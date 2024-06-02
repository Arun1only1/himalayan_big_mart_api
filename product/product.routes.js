import express from "express";
import mongoose from "mongoose";
import { isUser } from "./authentication.middleware.js";
import Product from "./product.model.js";

const router = express.Router();

// ? add product
router.post("/product/add", isUser, async (req, res) => {
  //   extract new product from req.body
  const newProduct = req.body;

  //   add product
  await Product.create(newProduct);

  // send res
  return res.status(200).send({ message: "Product is added successfully." });
});

// ? get product list
router.get("/product/list", async (req, res) => {
  const products = await Product.find(
    {},
    { name: 1, price: 1, brand: 1, quantity: 1, image: 1 }
  );

  return res.status(200).send({ message: "success", productList: products });
});

// ? get single product
router.get("/product/detail/:id", isUser, async (req, res) => {
  //  extract product id from req.params
  const productId = req.params.id;

  // check for mongo id validity
  const isValidObjectId = mongoose.isValidObjectId(productId);

  // if  not valid mongo valid, throw error
  if (!isValidObjectId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find product using product id
  const requiredProduct = await Product.findOne({ _id: productId });

  // if not product, throw error
  if (!requiredProduct) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  // send res
  return res
    .status(200)
    .send({ message: "success", productDetail: requiredProduct });
});

// ? delete a product
router.delete("/product/delete/:id", isUser, async (req, res) => {
  // extract product id from req.params
  const productId = req.params.id;

  // check for mongo id validity
  const isValidObjectId = mongoose.isValidObjectId(productId);

  // if not valid mongo id, throw error
  if (!isValidObjectId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find product using product id
  const requiredProduct = await Product.findOne({ _id: productId });

  // if not product, throw error
  if (!requiredProduct) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  // delete product by product id
  await Product.deleteOne({ _id: productId });

  // send res
  return res.status(200).send({ message: "Product is deleted successfully." });
});

// ?  edit product
router.put("/product/edit/:id", isUser, async (req, res) => {
  // extract product id from req.params
  const productId = req.params.id;

  // check for mongo id validity
  const isValidObjectId = mongoose.isValidObjectId(productId);

  // if not valid mongo id, throw error
  if (!isValidObjectId) {
    return res.status(400).send({ message: "Invalid mongo id." });
  }

  // find product
  const requiredProduct = await Product.findOne({ _id: productId });

  // if not product, throw error
  if (!requiredProduct) {
    return res.status(404).send({ message: "Product does not exist." });
  }

  // extract new values from req.body
  const newValues = req.body;

  // edit product
  await Product.updateOne(
    { _id: productId },
    {
      $set: {
        ...newValues,
      },
    }
  );
  // send res
  return res.status(200).send({ message: "Product is edited successfully." });
});

export default router;
