const express = require("express");
const auth = require("./auth");
const crawlMamuallyTruyenFull = require("./CrawlMunallyTruyenFullRouter");
const loveStoryRourter = require("./loveStoryRourter");
const commentRouter = require("./CommentRouter");
const homeRouter = require("./homeRouter");
const RouterSubpage = require("./subpagesRouter");
const listCategory = require("./listCategory");
const getAllAdmin = require("./GetAllAdminRouter");
const noAuth = require("./noAuth");
const DashBoardRouter = require("./DashBoardRouter");
function router(app, io) {
  app.use("/api/v1/auth", auth);
  app.use("/api/v1", listCategory());
  app.use("/api/v1", DashBoardRouter());
  app.use("/api/v1", loveStoryRourter());
  app.use("/api/v1", commentRouter());
  app.use("/api/v1", getAllAdmin());
  app.use("/api/v2", homeRouter());
  app.use("/api/v2", RouterSubpage());
  app.use("/api/v2", noAuth());
  app.use("/api/truyenfull/v3", crawlMamuallyTruyenFull(io));
}
module.exports = router;
