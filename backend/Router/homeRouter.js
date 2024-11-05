const express = require("express");
const GetHomeController = require("../Controller/GetHomeController");
const {
  TotalViewPagemiddleware,
} = require("../Middlewares/tatalViewPageMiddleware");
const Router = express.Router();
function homeRouter() {
  const { viewPageMiddleWare } = require("../Middlewares/viewPageMidddleware");
  Router.get("/story/get-home", viewPageMiddleWare, GetHomeController.getHome);

  return Router;
}

module.exports = homeRouter;
