const jwt = require("jsonwebtoken");
const User = require("../models/User");

// middleware
const requireSignin = async (req, res, next) => {
  try {
    // check xem có token trong headers hay không
    if (
      req.headers["authorization"] &&
      req.headers["authorization"].startsWith("bearer")
    ) {
      // lấy token từ header
      const token = req.headers["authorization"].split(" ")[1];
      // Không có token đính kèm
      if (!token) {
        return res.status(200).json({
          message: "No token",
        });
      }
      const { email } = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findOne({ email }).exec();
      next();
    } else {
      // Không có trường authorization or không bắt đầu bởi bearer
      return res.status(200).json({
        errorCode: 1,
        message: "No token",
      });
    }
  } catch (error) {
    // token hết hạn
    if (error.name === "TokenExpiredError") {
      return res.status(200).json({
        errorCode: 2,
        code: 401,
        newAccessToken: "new Access token",
        message: "jwt expired",
        error,
      });
    }
    // lỗi khác
    return res.status(200).json({
      code: 500,
      error,
      message: "invalid",
    });
  }
};

let isEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regex.test(email)) {
    next();
  }

  res.send("not pass");
};

// behind middleware requireSignin
let isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  }

  return res.send("is not admin");
};
module.exports = { requireSignin, isEmail, isAdmin };
