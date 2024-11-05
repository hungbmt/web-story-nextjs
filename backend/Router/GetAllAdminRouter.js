const express = require("express");
const GetAllAdminComtroller = require("../Controller/GetAllAdminComtroller");
const router = express.Router();

const getAllRouter = () => {
  router.get("/get-all-product", GetAllAdminComtroller.getAllProduct);
  router.get("/get-data-chapter/:slug", GetAllAdminComtroller.getDataChapter);
  router.put("/update-chapter/", GetAllAdminComtroller.updateChapter);
  router.post("/add-chapter/:slug", GetAllAdminComtroller.addChapter);
  return router;
};
module.exports = getAllRouter;
