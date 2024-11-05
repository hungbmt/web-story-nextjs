const express = require("express");
const connect = require("../Config/connectMySql");

const viewPageMiddleWare = async (req, res, next) => {
  const slugPath = "http://localhost:3001/";
  const today = new Date().toISOString().split("T")[0]; // Lấy ngày hiện tại theo định dạng YYYY-MM-DD

  try {
    const [findIndex] = await connect.query(
      "SELECT * FROM viewss WHERE path = ? AND date = ?",
      [slugPath, today]
    );
    if (findIndex.length < 1) {
      await connect.query(
        "INSERT INTO viewss (path, view_count, date) VALUES (?, 1, ?)",
        [slugPath, today]
      );
    } else {
      await connect.query(
        "UPDATE viewss SET view_count = view_count + 1 WHERE path = ? AND date = ?",
        [slugPath, today]
      );
    }
    next();
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).send("Unexpected error");
  }
};

module.exports = { viewPageMiddleWare };
