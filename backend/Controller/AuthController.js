const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connect = require("./../Config/connectMySql");
const { json } = require("body-parser");
const { accesstoken, generateRefreshToken } = require("../Config/token");
const ApiError = require("../Config/ApiError");
const { use } = require("bcrypt/promises");
class authController {
  async Apiregister(req, res, next) {
    const { username, email, password } = req.body;
    const saltRounds = 6;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const sql = `INSERT INTO auth (username, email, password) VALUES (?, ?, ?)`;

    try {
      // Thực thi câu lệnh SQL với dữ liệu người dùng
      await connect.query(sql, [username, email, hash]);
      return res.status(200).json({
        message: "Đăng kí Thành Công",
      });
    } catch (error) {
      next(error);
    }
  }
  async ApiLogin(req, res, next) {
    const { email, username, password } = req.body;
    try {
      let sql = "SELECT * FROM auth WHERE username = ? OR email = ?";
      const [result] = await connect.query(sql, [username, email]);
      const user = result[0];
      const match = bcrypt.compareSync(password, user.password);
      if (result.length === 0) {
        return res.status(401).json({ message: "Đăng nhập thất bại" });
      }
      if (!match || !user.username || !user.email) {
        return res.status(401).json({ message: "Đăng nhập thất bại" });
      }
      if (
        (match === true && user.username) ||
        (match === true && !user.email)
      ) {
        const AccessToken = accesstoken(user);
        const RefreshToken = await generateRefreshToken(user);
        res.cookie("refreshToken", RefreshToken, {
          path: "/",
          secure: true,
          httpOnly: true,
        });
        const { password, ...data } = user;
        return res.status(200).json({
          success: true,
          message: "Đăng nhập thành công",
          data,
          AccessToken,
          RefreshToken,
        });
      }
    } catch (error) {
      console.log(error);
      success: false, res.status(500).send("Server error");
      next(error);
    }
  }
  async ApiResetToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken;
    try {
      if (!refreshToken) return res.sendStatus(401);
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN,
        async (error, user) => {
          if (error) return res.json({ message: "token not valid" });
          const AccessToken = accesstoken(user);
          const NewrefreshTokens = await generateRefreshToken(user);
          res.cookie("refreshToken", NewrefreshTokens, {
            path: "/",
            secure: true,
            httpOnly: true,
          });
          res.status(200).json({
            success: true,
            message: "success",
            AccessToken,
          });
        }
      );
    } catch (error) {
      success: false;

      console.log(error);
      next(error);
    }
  }
}

module.exports = new authController();
