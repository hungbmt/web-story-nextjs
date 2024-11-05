const express = require("express");
const crawlManuallyTruyenFullController = require("../Controller/crawlManuallyTruyenFull.Controller");
const router = express.Router();
function crawlManuallyRouter(io) {
  const controller = new crawlManuallyTruyenFullController(io);
  router.post("/crawl", controller.crawlStrory.bind(controller));
  router.post("/crawl-much-story", controller.crawlStroryMuch.bind(controller));
  router.post(
    "/crawl-category-story",
    controller.crawlStroryCategory.bind(controller)
  );
  router.post("/update-story", controller.updateStory.bind(controller));
  return router;
}
module.exports = crawlManuallyRouter;
