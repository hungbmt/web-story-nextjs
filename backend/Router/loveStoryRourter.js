const express = require("express");
const loveStoryController = require("../Controller/LoveStoryController");
const Router = express.Router();
function RouterSetting() {
  Router.post("/love-story", loveStoryController.like_Store);
  Router.post("/cancel-story/:title", loveStoryController.cancel_Store);
  return Router;
}

module.exports = RouterSetting;
