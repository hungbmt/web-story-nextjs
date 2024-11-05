const express = require("express");
const router = express.Router();
const categoryController = require("./../Controller/Category.Controller");
const { veryToken } = require("../Middlewares/veryToken");

// tạo danh  thể loại

function listCategory() {
  const controller = new categoryController();
  router.post("/create-category", veryToken, controller.createCategory.bind());
  router.post(
    "/delete/category/:id",
    veryToken,
    controller.deleteCategory.bind()
  );
  router.get("/get-category", controller.getCategory.bind());

  // tạo danh danh sách thể loại

  router.post("/create-list", veryToken, controller.createList.bind());
  router.delete("/delete/list/:id", veryToken, controller.deletelist.bind());
  router.get("/get-list", controller.getlist.bind());

  router.post("/create-content", veryToken, controller.createConten.bind());
  router.post(
    "/create-chapter/:slugStory",
    veryToken,
    controller.createchapter.bind()
  );
  router.get("/get/:slug", controller.getStory.bind());
  router.delete("/delete-content", controller.deleteContent.bind());
  // GIM STORY
  router.put("/gim-story/:id/:slug", veryToken, controller.gimStory.bind());
  // update content
  router.get("/get-update/:slug", veryToken, controller.getUpdate.bind());
  router.put("/update-story/:slug", veryToken, controller.updateContent.bind());

  router.post("/send-error", veryToken, controller.sendErrorStory.bind());
  router.get("/get-error", veryToken, controller.getErrorStory.bind());

  router.put(
    "/updata-chapter/:slug/:slug_1",
    veryToken,
    controller.updataChapter
  );
  return router;
}
module.exports = listCategory;
