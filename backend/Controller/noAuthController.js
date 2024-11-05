const express = require("express");
const connect = require("./../Config/connectMySql");
const removeVietnameseTones = require("../utils/removeVietnameseTones");
class NoAuthController {
  // Arrow function for getProductCategory
  getProductCategory = async (req, res, next) => {
    const { category } = req.params;
    const page = parseInt(req.query.page, 10) || 1; // Properly parse page from query
    const numPerPage = 20;
    const skip = (page - 1) * numPerPage; // Calculate the offset for pagination
    try {
      const finCategory = `
          SELECT * FROM subpages 
          WHERE  slug_category LIKE CONCAT('%', ?, '%') LIMIT ?, ?
        `;
      const rows = await connect.query(finCategory, [
        category,
        skip,
        numPerPage,
      ]);
      const sqlNameCategory = `SELECT category FROM category WHERE slug = ? `;
      const [nameCategory] = await connect.query(sqlNameCategory, [category]);
      const sqlTotalStory =
        "SELECT COUNT(*) AS NumberOfStory FROM subpages WHERE slug_category LIKE CONCAT('%', ?, '%')";
      const [totalStory] = await connect.query(sqlTotalStory, [category]);
      const totalPage = Math.ceil(totalStory[0].NumberOfStory / numPerPage);
      return res.json({
        success: true,
        name: nameCategory[0].category,
        message: "Success",
        data: rows[0],
        curentPage: page,
        totalStory: totalStory[0].NumberOfStory,
        totalPage: totalPage,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
}

module.exports = new NoAuthController();
