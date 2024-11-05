const express = require("express");
const ApiError = require("../Config/ApiError");
const connect = require("../Config/connectMySql");
const { veryToken } = require("../Middlewares/veryToken");
class SubpageController {
  async getSubpate(req, res, next) {
    const { sub } = req.params;
    const title = req.body.title; // Corrected here

    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    const limit = 50;
    const offset = page ? (page - 1) * limit : 0;
    try {
      const [[subpageResult], resultChapter, [countResult]] = await Promise.all(
        [
          connect.query("SELECT * FROM subpages WHERE slug = ?", [sub]),
          connect.query(
            "SELECT id,slug, slug_1, title, number_chapter, name_chapter  FROM chapter WHERE slug = ? AND (title LIKE ? OR number_chapter LIKE ? OR name_chapter LIKE ?) LIMIT ? OFFSET ?",
            [sub, `%${search}%`, `%${search}%`, `%${search}%`, limit, offset]
          ),
          connect.query(
            "SELECT COUNT(*) AS NumberOfChapters FROM chapter WHERE slug = ?",
            [sub]
          ),
        ]
      );
      const totalPage = Math.ceil(countResult[0].NumberOfChapters / limit);
      return res.status(200).json({
        message: "Success",
        data: subpageResult[0],
        chapter: resultChapter[0],
        totalChapter: countResult[0].NumberOfChapters,
        curenPage: page,
        totalPage: totalPage,
      });
    } catch (error) {
      console.log(error);
      next();
    }
  }

  async getchapter(req, res, next) {
    const { sub, chapter } = req.params;

    // Kiểm tra trạng thái chapter để xem nó có bị khóa không
    const chapterQuery = `SELECT is_locked FROM chapter WHERE slug = ? AND slug_1 = ?`;
    const [resultLock] = await connect.query(chapterQuery, [sub, chapter]);

    if (resultLock.length === 0) {
      return res.status(404).json({ message: "Chapter không tồn tại" });
    }

    const lockedChapter = Boolean(resultLock[0].is_locked);

    const [result] = await connect.query(
      "SELECT * FROM chapter WHERE slug = ? AND slug_1 = ?",
      [sub, chapter]
    );

    // Lấy tổng số chapter
    const [count] = await connect.query(
      "SELECT COUNT(*) as count_chapter FROM chapter WHERE slug = ?",
      [sub]
    );
    if (lockedChapter) {
      // Nếu chapter bị khóa, tiếp tục qua middleware verifyToken
      return veryToken(req, res, async () => {
        // Lấy userId từ token sau khi đã xác thực
        const userId = req.decoded.id;
        console.log(userId);
        // Kiểm tra xem người dùng đã mua chưa
        const purchaseQuery = `SELECT * FROM purchases WHERE user_id = ? AND slug_story = ? AND slug_CHAPTER = ?`;
        const [resultPurch] = await connect.query(purchaseQuery, [
          userId,
          sub,
          chapter,
        ]);
        console.log(resultPurch);
        if (resultPurch.length === 0) {
          return res
            .status(403)
            .json({ message: "Bạn cần mua chapter này để xem" });
        }

        // Nếu người dùng đã mua chapter, cho phép truy cập
        return res.status(200).json({
          message: "Truy cập chapter thành công",
          data: result[0],
          count_chapter: count[0].count_chapter,
        });
      });
    } else {
      // Nếu chapter không khóa, cho phép truy cập mà không cần kiểm tra token
      return res.json({
        message: "Truy cập chapter thành công",
        data: result[0],
        count_chapter: count[0].count_chapter,
      });
    }
  }
  async viewProduct(req, res, next) {
    const { sub } = req.params;
    try {
      await connect.query(
        "UPDATE subpages SET view = view + 1, view_day = view_day + 1, view_today = view_today + 1, view_month = view_month + 1, view_year = view_year + 1 WHERE slug = ?",
        [sub]
      );
      // total_view = total_view + 1
      res.status(200).send({ message: "Views updated successfully" });
    } catch (error) {
      console.log(error);
      next(new ApiError("errServer"));
    }
  }

  // bai viet lien quan
  async getrelatedStory(req, res, next) {
    const { genres } = req.body;
    const { slug } = req.params;

    try {
      const placeholders = genres
        .map(() => "JSON_CONTAINS(genres, ?)")
        .join(" OR ");
      //  JSON_CONTAINS cho từng thể loại trong mảng genres.
      // Ví dụ, nếu có 3 thể loại, chuỗi sẽ trông như thế này:
      // "JSON_CONTAINS(genres, ?) OR JSON_CONTAINS(genres, ?) OR JSON_CONTAINS(genres, ?)"
      const values = genres.map((genre) => JSON.stringify([{ genres: genre }]));

      const query = `SELECT id,title,imgStory,slug FROM subpages WHERE ${placeholders} LIMIT 5`;

      const [rows] = await connect.query(query, values);

      res.status(200).json({
        message: "Success",
        data: rows,
      });
    } catch (error) {
      next();
    }
  }
}
module.exports = new SubpageController();
