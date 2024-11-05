const express = require("express");
const router = express.Router();
const subpageController = require("./../Controller/SubpageController");
const { viewPageMiddleWare } = require("../Middlewares/viewPageMidddleware");
const {
  TotalViewPagemiddleware,
} = require("../Middlewares/tatalViewPageMiddleware");
const { veryToken } = require("../Middlewares/veryToken");

function RouterSubpage() {
  router.get(
    "/subpage/:sub",
    viewPageMiddleWare,
    TotalViewPagemiddleware,
    subpageController.getSubpate.bind()
  );
  router.get(
    "/story/:sub/:chapter",
    viewPageMiddleWare,
    TotalViewPagemiddleware,
    subpageController.getchapter.bind()
  );
  router.post("/story/related-story", subpageController.getrelatedStory.bind());
  // view product
  router.put("/view/:sub/", subpageController.viewProduct.bind());

  return router;
}

module.exports = RouterSubpage;
