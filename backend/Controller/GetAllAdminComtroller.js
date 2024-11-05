const express = require("express");
const connect = require("../Config/connectMySql");

class GetAllAdmin {
  async getAllProduct(req, res, next) {
    try {
      const sql = "SELECT title, isActive, gim, slug, id FROM subpages";
      const [result] = await connect.query(sql);
      res.status(200).json({
        success: true,
        message: "success",
        data: result,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async getDataChapter(req, res, next) {
    try {
      const { slug } = req.params;
      const limit = 20;

      // Ensure the page query parameter is a valid number and default to 1 if not
      const page = Math.max(1, parseInt(req.query.page, 10) || 1);
      // const page = Math.max(1, parseInt(req.body.page, 10) || 1);
      const offset = (page - 1) * limit;

      const [[resultData], [chapter], [[{ ChapterCount }]]] = await Promise.all(
        [
          connect.query("SELECT * FROM subpages WHERE slug = ?", [slug]),
          connect.query(
            "SELECT * FROM chapter WHERE slug = ? LIMIT ? OFFSET ?",
            [slug, limit, offset]
          ),
          connect.query(
            "SELECT COUNT(*) as ChapterCount FROM chapter WHERE slug = ?",
            [slug]
          ),
        ]
      );
      const totalChapter = Math.ceil(ChapterCount / limit);

      if (!resultData.length) {
        return res.status(404).json({ message: "Slug not found" });
      }

      res.status(200).json({
        data: resultData[0],
        chapter,
        totalChapter: ChapterCount,
        totalPage: totalChapter,
        currentPage: page,
        message: "success",
      });
    } catch (error) {
      next(error); // Passes the error to the global error handler
    }
  }

  async updateChapter(req, res, next) {
    const { slug, slug_1, title, chapter, content } = req.body;
    const sql =
      "UPDATE chapter SET title = ? ,chapter = ?,content =? WHERE slug = ? AND slug_1 = ?";
    try {
      const [result] = await connect.query(sql, [
        title,
        chapter,
        content,
        slug,
        slug_1,
      ]);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Chapter updated successfully" });
      } else {
        res.status(404).json({ message: "Chapter not found" });
      }
      console.log(result.affectedRows);
    } catch (error) {
      console.log(error);
    }
  }
  addChapter(req, res, next) {
    const slug = req.params.slug;
    const { title, chapter, conten } = req.body;
  }
}
module.exports = new GetAllAdmin();
