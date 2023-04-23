const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cart = require("../models/Cart");
const { ReturnDocument } = require("mongodb");

const bornToken = (data, secret, time) => {
  return jwt.sign(data, secret, { expiresIn: time });
};

const refreshToken = (req, res) => {
  try {
    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(200).json({
      message: "No token",
    });
  }
};

// [POST] : /signin
let Signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // find user
    let user = await User.findOne({ email }).exec();
    // check user ? exist
    if (!user) {
      return res.status(200).json({
        errorCode: 1,
        message: "Email is not exist!",
      });
    }
    // check password
    if (!user.authentication(password)) {
      return res.status(200).json({
        errorCode: 2,
        message: "Incorrect password!",
      });
    }
    // correct email and password
    const access_token = bornToken({ email }, process.env.SECRET_KEY, "30m");
    return res.status(200).json({
      errorCode: 0,
      message: "Signin successful",
      access_token,
    });
  } catch (error) {
    return res.status(200).json({
      errorCode: 3,
      message: "error in backend",
      error,
    });
  }
};

// [POST] : /signup
let Signup = async (req, res) => {
  // get data from req.body
  let dataUser = ({ firstName, lastName, email, password } = req.body);
  try {
    // find user to check exist
    let user = await User.findOne({ email: dataUser.email }).exec();
    if (user) {
      return res.status(200).json({
        errorCode: 1,
        message: "Email already exist!",
        user,
      });
    }

    const refresh_token = bornToken({ email }, process.env.REFRESH_KEY, "365d");
    dataUser = { ...dataUser, refresh_token };
    // create and save new user
    let newUser = new User(dataUser);
    await newUser.save((validateBeforeSave = true));
    return res.status(200).json({
      errorCode: 0,
      message: "create new user successful!",
    });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};

// [GET] : /:id
let getUser = (req, res) => {
  // get userId from url
  let id = req.params.id;

  // if user is user in token
  if (id === req.user.id) {
    return res.json(req.user);
  }
  // else
  return res.json({
    message: "this user don't login",
  });
};

// USER
// GET: /
let getAllUser = (req, res) => {
  res.send("get all user");
};
// PUT : /:id
let updateUser = async (req, res) => {
  try {
    let data = req.body;
    let id = req.params.id;
    let newUser = await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
    });
    res.status(200).json({
      message: "update successful!",
      newUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};

// DELETE: /:id
let deleteUser = async (req, res) => {
  try {
    let id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "Delete user successful!",
    });
  } catch (error) {
    return res.status(400).json({
      messsage: "error",
      error,
    });
  }
};

// GET /cart
let getCart = async (req, res) => {
  try {
    let userId = req.user._id;
    let cart = await Cart.findOne({ user: userId }).exec();
    if (!cart) {
      let newCart = new Cart({
        user: userId,
        cartItems: [],
      });
      newCart.save();
      return res.status(400).json({
        message: "Cart not found",
        cart,
      });
    }
    return res.status(200).json({
      message: "OK",
      cart,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error",
      error,
    });
  }
};
module.exports = {
  Signin,
  Signup,
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
  getCart,
  refreshToken,
};
