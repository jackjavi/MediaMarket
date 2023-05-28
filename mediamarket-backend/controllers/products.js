const cloudinary = require("cloudinary").v2;
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const createProduct = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;

    // Create the product in the database
    const product = await Product.create(req.body);

    res.status(StatusCodes.CREATED).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "An error occurred while creating the product",
    });
  }
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getProduct = async (req, res) => {
  const {
    user: { userId },
    params: { id: productId },
  } = req;

  const product = await Product.findOne({
    _id: productId,
    createdBy: userId,
  });
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const {
    user: { userId },
    params: { id: productId },
  } = req;

  const product = await Product.findOneAndUpdate(
    { _id: productId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const {
    user: { userId },
    params: { id: productId },
  } = req;

  const product = await Product.findOneAndRemove({
    _id: productId,
    createdBy: userId,
  });
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProduct,
};
