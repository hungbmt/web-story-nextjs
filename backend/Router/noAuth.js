const express = require("express");
const NoAuthController = require("../Controller/noAuthController");
const {
  TotalViewPagemiddleware,
} = require("../Middlewares/tatalViewPageMiddleware");
const { viewPageMiddleWare } = require("../Middlewares/viewPageMidddleware");
const Router = express.Router();

function noAuth() {
  Router.get(
    "/get-product-category/:category",
    TotalViewPagemiddleware,
    viewPageMiddleWare,
    NoAuthController.getProductCategory
  );
  return Router;
}

module.exports = noAuth;
