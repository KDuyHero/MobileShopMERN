const express = require("express");
const multer = require("multer");
const route = express.Router();
const {
  getAllProduct,
  getProduct,
  createProduct,
  getEditProductForm,
  getProductByCategory,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images");
  },
  filename: function (req, file, cb) {
    // imageName: product-time-fileNameUpload
    cb(null, "product-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// get all product ~ Homepage
route.get("/", getAllProduct);

//get one product ~ ViewDetail
route.get("/:id", getProduct);

// get all product by category
route.get("/categorys/:category", getProductByCategory);

// create new product
route.post("/", upload.array("images", 5), createProduct);

// update product
route.put("/:id", upload.array("images", 5), updateProduct);

//delete product
route.delete("/:id", deleteProduct);
module.exports = route;
