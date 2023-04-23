const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/User");

// POST  /add
// middleware requireSignin
let addToCart = async (req, res) => {
  /*
  req.body {
    cartItems: {
      product: productId, 
      quantity, 
      price
    }
  }
   */
  try {
    let cart = await Cart.findOne({ user: req.user._id }).exec();
    // has cart
    if (cart) {
      let product = req.body.cartItems.product;
      // find product in cart
      let indexItem = cart.cartItems.findIndex((item) => {
        return item.product == product;
      });
      // has product
      if (indexItem >= 0) {
        let newQuantity =
          cart.cartItems[indexItem].quantity + req.body.cartItems.quantity;
        // change cartItems with spread
        cart.cartItems[indexItem] = {
          ...req.body.cartItems,
          quantity: newQuantity,
        };
        // save
        let newCart = await cart.save();
        res.status(200).json({
          errorCode: 0,
          message: "OK",
          cart: newCart,
        });
      } else {
        // add product to cart
        cart.cartItems.push(req.body.cartItems);
        cart.save();
        return res.status(200).json({
          errorCode: 0,
          message: "OK",
          cart: cart,
        });
      }
    } else {
      // don't has cart before
      const newCart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      await newCart.save();
      return res.status(200).json({
        errorCode: 0,
        message: "OK",
        cart: newCart,
      });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// DELETE
// remove is add with odd quantity
let removeFromCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).exec();
    // has cart
    if (cart) {
      let product = req.body.cartItems.product;
      // find product in cart
      let indexItem = cart.cartItems.findIndex((item) => {
        return item.product == product;
      });
      // has product
      if (indexItem >= 0) {
        // change cartItems with spread
        // new quantity
        let newQuantity =
          cart.cartItems[indexItem].quantity - req.body.cartItems.quantity;
        // delete product
        if (newQuantity <= 0) {
          cart.cartItems.splice(indexItem, 1);
          let newCart = await cart.save();
          return res.status(200).json({
            errorCode: 0,
            message: "OK",
            newCart,
          });
        }
        cart.cartItems[indexItem] = {
          ...req.body.cartItems,
          quantity: newQuantity,
        };
        // save
        let newCart = await cart.save();
        res.status(200).json({
          errorCode: 0,
          message: "OK",
          newCart,
        });
      } else {
        // add product to cart

        return res.status(200).json({
          errorCode: 1,
          message: "Don't found product",
        });
      }
    } else {
      const newCart = new Cart({
        user: req.user._id,
        cartItems: [],
      });
      await newCart.save();
      return res.status(201).json({ newCart });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};
module.exports = { addToCart, removeFromCart };
