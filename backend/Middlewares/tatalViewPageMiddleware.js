const express = require("express");
const connect = require("../Config/connectMySql");

const TotalViewPagemiddleware = async (req, res, next) => {
  const path = "http://localhost:3001/";
  try {
    const [FindPath] = await connect.query(
      `SELECT * FROM views WHERE path = ?`,
      [path]
    );
    if (FindPath < 1) {
      await connect.query("INSERT INTO views (path,view_count) VALUES (?,1)", [
        path,
      ]);
    } else {
      await connect.query(
        "UPDATE views SET view_count = view_count + 1 WHERE path = ?",
        [path]
      );
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
module.exports = { TotalViewPagemiddleware };
