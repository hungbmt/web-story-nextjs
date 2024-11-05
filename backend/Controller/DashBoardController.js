const express = require("express");
const connect = require("../Config/connectMySql");
class DashBoardController {
  async chartPage(req, res, next) {
    try {
      const sql = `SELECT * FROM viewss ORDER BY date DESC LIMIT 5`;
      // Trả về dữ liệu nếu thành công
      const [result] = await connect.query(sql);
      return res.status(200).json({
        data: result,
        success: true,
        message: "Success",
      });
    } catch (error) {
      // Xử lý lỗi và trả về phản hồi lỗi
      console.error("Error executing query:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
  async parameter(req, res, next) {
    let path = "http://localhost:3001/";
    const [[totalStory], [totalViewPage], [totalUser], [totalError]] =
      await Promise.all([
        // total story
        await connect.query("SELECT COUNT(*) as count FROM subpages"),
        // total view page
        await connect.query("SELECT view_count FROM views WHERE path = ?", [
          path,
        ]),
        // total user
        await connect.query("SELECT COUNT(*) as count FROM auth"),
        // total eror-repost
        await connect.query("SELECT COUNT(*) as count FROM error_story"),
      ]);
    res.status(200).json({
      totalStory: totalStory[0].count,
      totalViewPage: totalViewPage[0].view_count,
      totalUser: totalUser[0].count,
      totalError: totalError[0].count,
      success: true,
      message: "success",
    });
  }
}

module.exports = new DashBoardController();
