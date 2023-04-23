const express = require("express");
const route = express.Router();
const { addToCart, removeFromCart } = require("../controller/cartController");
const { requireSignin } = require("../middlewares/auth.middleware");
route.post("/add", requireSignin, addToCart);
route.post("/remove", requireSignin, removeFromCart);
module.exports = route;
