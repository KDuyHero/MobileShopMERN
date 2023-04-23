const express = require("express");
const fetch = require("node-fetch");
const route = express.Router();
const userRoute = require("./userRoute");
const productRoute = require("./productRoute");
const cartRoute = require("./cartRoute");
const testRoute = require("./testRoute");

let Router = (app) => {
  route.use("/users", userRoute);
  route.use("/products", productRoute);
  route.use("/carts", cartRoute);
  route.use("/test", testRoute);
  route.get("/", (req, res) => {
    res.render("test");
  });
  app.use("/api", route);
};

module.exports = Router;
