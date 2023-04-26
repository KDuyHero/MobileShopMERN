const Product = require("../models/Product");

// GET /
let getAllProduct = async (req, res) => {
  try {
    let products = await Product.find({}).exec();
    return res.status(200).json({
      message: "OK",
      products,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};

// GET /:id
let getProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let product = await Product.findById(id).exec();
    if (!product) {
      return res.status(200).json({
        errorCode: 1,
        message: "don't found product",
        product: {},
      });
    }
    // res.render("Product/ViewProduct", {
    //   product: product,
    //   signin: true,
    //   signup: true,
    // });
    return res.status(200).json({
      errorCode: 0,
      message: "OK",
      product,
    });
  } catch (error) {
    res.status(400).json({
      message: "error",
      error,
    });
  }
};

//  POST /
let createProduct = async (req, res) => {
  try {
    let data = ({
      name,
      description,
      price,
      discount,
      category,
      rear_camera,
      front_camera,
      operating_system,
      display_size,
      power,
      memory,
      ram,
    } = req.body);
    data.images = req.files.map((file) => file.filename);
    data.detail = {
      rear_camera,
      front_camera,
      operating_system,
      display_size,
      power,
      memory,
      ram,
    };

    let product = new Product(data);
    product.save((validateBeforeSave = true));
    return res.status(200).json({
      message: "OK",
      product: product,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};

// PUT /:id
let updateProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let data = ({ name, description, price, discount } = req.body);
    if (req.file) {
      data.image = req.file.path.split("public")[1];
    }
    let newProduct = await Product.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
    return res.status(200).json({
      message: "OK",
      newProduct,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};

// DELETE /:id
let deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let productDelete = await Product.findByIdAndDelete(id).exec();
    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};

//GET /categorys/:category
let getProductByCategory = async (req, res) => {
  try {
    let category = req.params.category;
    let products = await Product.find({ category }).exec();
    res.status(200).json({
      errorCode: 0,
      message: "OK",
      products,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error",
      error,
    });
  }
};
module.exports = {
  getAllProduct,
  getProduct,
  createProduct,
  getProductByCategory,
  updateProduct,
  deleteProduct,
};
