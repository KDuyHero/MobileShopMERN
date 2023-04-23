const express = require("express");
const route = express.Router();

const {
  Signin,
  Signup,
  getUser,
  updateUser,
  deleteUser,
  getAllUser,
  getCart,
  refreshToken,
} = require("../controller/userController");
const {
  requireSignin,
  isEmail,
  isAdmin,
} = require("../middlewares/auth.middleware");

// auth
route.post("/signin", Signin);
// ~ /users [create user]
route.post("/signup", Signup);

// User

// get cart
route.get("/cart", requireSignin, getCart);

// get all user
route.get("/", getAllUser);
route.get("/refresh-token", refreshToken);
// view info
route.get("/:id", requireSignin, getUser);

// update info
route.put("/:id", updateUser);

// delete user
route.delete("/:id", deleteUser);

// refresh_token

module.exports = route;
