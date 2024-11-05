const express = require("express");
const DashBoardController = require("../Controller/DashBoardController");
const { veryToken } = require("../Middlewares/veryToken");
const router = express.Router();

function DashBoardRouter() {
  router.get("/chart-viewpage", veryToken, DashBoardController.chartPage);
  router.get("/parameter", veryToken, DashBoardController.parameter);
  return router;
}

module.exports = DashBoardRouter;
