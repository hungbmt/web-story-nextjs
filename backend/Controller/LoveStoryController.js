const express = require("express");
const connect = require("../Config/connectMySql");
const ApiError = require("../Config/ApiError");

class V5Controller {
  like_Store(req, res, next) {
    const { title, imgStory, username } = req.body;
    var sql =
      "INSERT INTO add_favorite (username, title,imgStory) VALUES (?,?,?)";
    connect.query(sql, [username, title, imgStory], (error, result) => {
      if (error) {
        throw new Error(500, "error server");
      }
    });
    try {
    } catch (error) {
      console.log(error);
      // next(error);
    }
  }
  async cancel_Store(req, res, next) {
    const title = req.params.title;

    const username = req.body.username;
    try {
      // Truy vấn cơ sở dữ liệu để lấy các hàng có title khớp
      const sqlSelect = `SELECT title, username FROM add_favorite WHERE title = ? AND username = ?`;
      const [rows] = await connect.query(sqlSelect, [title, username]);

      // Kiểm tra từng hàng xem có thỏa mãn điều kiện hay không
      const itemsToUpdate = rows.filter((item) => item.title && item.username);
      if (itemsToUpdate.length === 0) {
        return res
          .status(404)
          .json({ message: "Không có hàng nào cần cập nhật" });
      }
      var sql = "DELETE FROM add_favorite WHERE title = ? AND  username = ?";
      await connect.query(sql, [title, username]);
      // Trả kết quả về client
      res.json({ message: "cancel love story" });
    } catch (error) {
      console.log(error);
      next(new ApiError(500, "Internal Server Error", error.errno));
    }
  }
}

module.exports = new V5Controller();
