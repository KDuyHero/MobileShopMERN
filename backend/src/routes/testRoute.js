const express = require("express");
const route = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
// const imageModel = require("../models/Img");

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, "product-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// route.get("/", (req, res) => {
//   res.send("test");
// });

route.post("/uploadphoto", upload.single("myImage"), async (req, res) => {
  res.send(req.file);
});

module.exports = route;
