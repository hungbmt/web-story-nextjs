const express = require("express");
const removeVietnameseTones = require("../utils/removeVietnameseTones");
const connect = require("./../Config/connectMySql");
const ApiError = require("../Config/ApiError");
class CategoryController {
  async createCategory(req, res, next) {
    try {
      const { category } = req.body;
      if (!category) {
        return res.status(400).json({ message: "Category is required" });
      }

      const slug = removeVietnameseTones(category.toLowerCase()).replace(
        / /g,
        "-"
      );

      let sql = "INSERT INTO category (category, slug) VALUES (?, ?)";
      await connect.query(sql, [category, slug]);
      // const sqlGetCategory = "SELECT * FROM category";
      // const [rows] = await connect.query(sqlGetCategory);
      return res.json({
        success: true,
        message: "Category created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
      next(error);
    }
  }

  // get all category /api/v1/get-category
  async getCategory(req, res, next) {
    try {
      const sql = "SELECT * FROM category";
      const [rows] = await connect.query(sql);
      return res.json({
        message: "success",
        data: rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "server error" });
      next(error);
    }
  }

  async createList(req, res, next) {
    const { list } = req.body;
    const slug = removeVietnameseTones(list.toLowerCase()).replace(/ /g, "-");
    try {
      const sql = "INSERT INTO list (list, slug)VALUE (?,?)";
      await connect.query(sql, [list, slug]);
      res.status(201).json({ message: "create list success" });
    } catch (error) {
      console.log(error);
      next(new ApiError("error Server"));
    }
  }
  async getlist(req, res, next) {
    try {
      const sql = "SELECT * FROM list";
      const [rows] = await connect.query(sql);
      return res.json({
        message: "success",
        data: rows,
      });
    } catch (error) {
      false;
      console.log(error);
      next(error);
    }
  }
  // delete category /v1/api/delete/category/:id
  deleteCategory(req, res, next) {
    const id = req.params.id;
    try {
      const sql = "DELETE FROM category WHERE id = (?)";
      connect.query(sql, [id], (err, result) => {
        if (err) {
          console.error("Lỗi khi xóa danh mục:", err);
          return res.status(500).json({ error: "Lỗi khi xóa danh mục" });
        } else {
          console.log("Danh mục đã được xóa thành công");
          return res
            .status(200)
            .json({ message: "Danh mục đã được xóa thành công" });
        }
      });
    } catch (error) {
      console.log(err);
      return res.status(500).json({ message: "Error server" });
    }
  }
  // delete list /v1/api/delete/list/id
  deletelist(req, res, next) {
    const id = req.params.id;
    const sql = "DELETE FROM list WHERE id = (?)";
    connect.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Xóa Thât Bại", err);
        res.status(500).json({ message: "Xóa Thất bại" });
      } else {
        res.status(200).json({ message: "Xóa Thành Công" });
      }
    });
  }
  async createConten(req, res, next) {
    const {
      title,
      author,
      genres,
      source,
      description,
      statusStory,
      imgStory,
    } = req.body;
    try {
      const slug = removeVietnameseTones(title.toLowerCase()).replace(
        / /g,
        "-"
      );
      const Array = JSON.parse(genres);
      const sql =
        "INSERT INTO subpages (title, author,genres,source,description,statusStory,imgStory,slug) VALUES (?,?,?,?,?,?,?,?)";
      await connect.query(sql, [
        title,
        author,
        JSON.stringify(Array),
        source,
        description,
        statusStory,
        imgStory,
        slug,
      ]);
      // Fetch the newly inserted subpage
      const fetchSql = "SELECT * FROM subpages WHERE slug = ?";
      const [result] = await connect.query(fetchSql, [slug]);
      // Log the result and send a success response
      res.status(201).json({
        message: "Success",
        data: result[0],
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getUpdate(req, res, next) {
    const { id, slug } = req.params;
    const sql = "SELECT * FROM subpages WHERE  slug = ?";
    const [result] = await connect.query(sql, [slug]);
    return res.status(200).json({ message: "success", data: result[0] });
  }

  async updateContent(req, res, next) {
    const { title, description, author, imgStory, statusStory, genres } =
      req.body;
    const { id, slug } = req.params;

    try {
      const sql = "SELECT * FROM subpages WHERE  slug = ?";
      // const [result] = await connect.query(sql, [slug]);
      const sqlUpdate =
        "UPDATE subpages SET title = ?,description = ?, author = ?, imgStory = ? ,statusStory = ? ,genres = ? WHERE slug = ?";
      await connect.query(sqlUpdate, [
        title,
        description,
        author,
        imgStory,
        statusStory,
        genres,
        slug,
      ]);
      const [resultUpdate] = await connect.query(sql, [slug]);

      res.status(200).json({
        message: "success",
        resultUpdate,
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  createchapter(req, res, next) {
    const { slugStory } = req.params;
    console.log(slugStory);
    const { title, number_chapter, name_chapter, content } = req.body;
    // const slugTile = removeVietnameseTones(title.toLowerCase()).replace(
    //   / /g,
    //   "-"
    // );
    // const slugchapters = removeVietnameseTones(chapter.toLowerCase()).replace(
    //   / /g,
    //   "-"
    // );

    // const slug = `/${slugTile}/${slugchapters}`;
    const slug_1 = `chuong-${number_chapter}`;

    try {
      const sql =
        "INSERT INTO chapter (title, number_chapter, name_chapter ,content, slug ,slug_1) VALUES (?, ?, ?, ?, ?,?)";
      connect.query(sql, [
        title,
        number_chapter,
        name_chapter,
        content,
        slugStory,
        slug_1,
      ]);
      res.status(201).json({
        message: "create Chapter success",
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  async getStory(req, res, next) {
    const { slug } = req.params;
    try {
      const query = `
        SELECT chapter, slugStory,slug
        FROM chapter
        WHERE slugStory = (?);
      `;
      const querys = `
        SELECT *
        FROM subpages
        WHERE slug = (?);
      `;
      // const [chapterRows] = await connect.query(query, [slug]);
      // const [subpagesRows] = await connect.query(querys, [slug]);
      const [chapterRows, subpagesRows] = await Promise.all([
        connect.query(query, [slug]),
        connect.query(querys, [slug]),
      ]);
      res.json({
        data: subpagesRows[0],
        chapter: chapterRows[0],
      });
    } catch (error) {
      next(error);
      console.error("Error executing query:", error);
    } finally {
      connect.end();
    }
  }

  // delete content
  async deleteContent(req, res, next) {
    const { title } = req.body;
    try {
      await Promise.all([
        connect.query("DELETE FROM subpages WHERE title = ?", [title]),
        connect.query("DELETE FROM liststory WHERE title = ?", [title]),
        connect.query("DELETE FROM listlinkchapter WHERE title = ?", [title]),
        connect.query("DELETE FROM chapter WHERE title = ?", [title]),
      ]);
      return res.status(200).json({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred", error });
      next(error);
    }
  }

  // gim story
  async gimStory(req, res, next) {
    const { id, slug } = req.params;
    const gim = req.body.gim;
    try {
      const sql = "UPDATE subpages SET gim = ? WHERE id = ? AND slug = ?";
      connect.query(sql, [gim, id, slug], (err, result) => {
        if (err) {
          console.log(err);
        }
      });
      res.status(200).json({ message: "Update successful" });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  // send error
  async sendErrorStory(req, res, next) {
    const {
      error_message,
      name_story,
      name_chapter,
      username_error_repost,
      slug_chapter,
      slug_1,
      slug_2,
    } = req.body;

    const sql =
      "INSERT INTO error_story ( error_message, name_story, name_chapter, username_error_repost,slug_chapter,slug_1,slug_2) VALUES (?,?,?,?,?,?,?)";

    try {
      await connect.query(sql, [
        error_message,
        name_story,
        name_chapter,
        username_error_repost,
        slug_chapter,
        slug_1,
        slug_2,
      ]);

      res.status(201).json({
        success: true,
        message: "Story error successfully logged",
      });
    } catch (error) {
      console.error("Error logging story:", error);
      next(error);
    }
  }
  //   getError
  async getErrorStory(req, res, next) {
    try {
      const sql = `SELECT * FROM error_story`;
      const [result] = await connect.query(sql);
      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Error getting story:", error);
      next(error);
    }
  }
  async updataChapter(req, res, next) {
    const { title, name_chapter, number_chapter, content } = req.body;
    const { slug, slug_1 } = req.params;
    try {
      const sql =
        "UPDATE chapter SET title = ?,name_chapter = ?, number_chapter = ?, content = ?  WHERE slug = ? AND slug_1 = ?";
      const result = await connect.query(sql, [
        title,
        name_chapter,
        number_chapter,
        content,
        slug,
        slug_1,
      ]);

      if (result.affectedRows === 0) {
        return res.status(400).json({
          success: false,
          message: "No rows were updated, please check the slugs.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Chapter updated successfully",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async DriveLockStory(req, res, next) {
    const { slug, chapter } = req.params;
    const { is_locked } = req.body;
    console.log(slug, chapter);
    try {
      const sql = `UPDATE chapter SET is_locked = ? WHERE slug = ? AND slug_1 = ?`;
      await connect.query(sql, [is_locked, slug, chapter]);
      return res.status(200).json({
        success: true,
        message: "success",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = CategoryController;
