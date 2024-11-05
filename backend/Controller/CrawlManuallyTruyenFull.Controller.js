const path = require("path");
const fs = require("fs");
const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const cron = require("node-cron");
const connect = require("./../Config/connectMySql");
const removeVietnameseTones = require("../utils/removeVietnameseTones");
const ApiError = require("./../Config/ApiError");

class CrawlManuallyController {
  constructor(io) {
    this.io = io;
  }
  // crawl one link
  async crawlStrory(req, res, next) {
    const { story, delay } = req.body;
    let chapterArr = [];
    let title;
    // const delay = 1000;
    const foundChapters = new Set();

    try {
      const response = await axios.get(story, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        },
      });
      const $ = cheerio.load(response.data);

      const genres = [];
      const novi = [];
      const titleH = $(".title").text();
      const description = $('*[itemprop="description"]').html();
      const imgStory = $(".book img").attr("src");
      const author = $('.info *[itemprop="author"]').text();
      const source = $(".info .source").text();
      const story_current = "truyenfull";
      const status =
        $(".info .text-success").text() + $(".info .text-primary").text();
      $('.info *[itemprop="genre"]').each((i, elem) => {
        genres.push($(elem).text());
        novi.push(removeVietnameseTones($(elem).text()));
      });
      const slug = removeVietnameseTones(titleH.toLowerCase()).replace(
        / /g,
        "-"
      );
      const arrayGenres = genres.map((genre) => {
        const slugGenres = removeVietnameseTones(genre.toLowerCase()).replace(
          / /g,
          "-"
        );
        return { genres: genre, slug: slugGenres };
      });
      const ArrayGenResNovi = novi.map((genre) => ({ genres: genre }));

      let downloadImage = async (url, filePath) => {
        const response = await axios({
          url,
          method: "GET",
          responseType: "stream",
        });
        return new Promise((resolve, reject) => {
          const writer = fs.createWriteStream(filePath);
          response.data.pipe(writer);
          writer.on("finish", resolve);
          writer.on("error", reject);
        });
      };
      const imageFilePath = path.join("./public/images", `${slug}.jpg`);
      const imageStorys = imageFilePath.replace("public", "");
      await downloadImage(imgStory, imageFilePath);
      // Save liststory database
      try {
        const sqlSubpage =
          "INSERT INTO subpages (title, imgStory, author, slug, description, statusStory, source, genres, slug_category) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)";
        await connect.query(sqlSubpage, [
          titleH,
          imageStorys,
          author,
          slug,
          description,
          status,
          source,
          JSON.stringify(arrayGenres),
          JSON.stringify(ArrayGenResNovi),
        ]);
        const sqlLinkStory =
          "INSERT INTO liststory (link_story, title, story_current) VALUES (?, ?, ?)";
        await connect.query(sqlLinkStory, [story, titleH, story_current]);
        // await connect.commit();
      } catch (error) {
        console.log(error);
        return next(new ApiError("Error inserting subpage"));
      }

      //  post category story
      for (let data of arrayGenres) {
        let category = data.genres;
        let slug = data.slug;

        try {
          // Kiểm tra xem category đã tồn tại hay chưa
          const [existingCategory] = await connect.query(
            "SELECT * FROM category WHERE category = ?",
            [category]
          );

          if (existingCategory.length > 0) {
            // Nếu category đã tồn tại, emit event và tiếp tục vòng lặp
            this.io.emit(
              "errorStoryDuplicate",
              `Category "${category}" already exists, skipping...`
            );
            console.log(`Category "${category}" already exists, skipping...`);
            continue; // Bỏ qua phần tử hiện tại và tiếp tục với phần tử tiếp theo
          }

          // Nếu không tồn tại, tiến hành thêm mới
          await connect.query(
            "INSERT INTO category (category, slug) VALUES (?, ?)",
            [category, slug]
          );
        } catch (error) {
          console.log(error);
          return next(new ApiError("Error inserting category"));
        }
      }

      for (let chapter = 1; true; chapter++) {
        const url = story + "trang-" + chapter;
        await new Promise((resolve) => setTimeout(resolve, delay));
        const response = await axios.get(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          },
        });
        const $ = cheerio.load(response.data);
        title = $(".title").text();
        let isDuplicate = false;
        $(".list-chapter li a").each((i, link) => {
          let chapterLink = $(link).attr("href");
          if (!chapterLink || chapterLink === "") {
            isDuplicate = true;
            return false;
          } else if (foundChapters.has(chapterLink)) {
            isDuplicate = true;
          } else {
            foundChapters.add(chapterLink);
            chapterArr.push(chapterLink);
          }
        });

        if (isDuplicate) {
          break;
        }
      }

      const sql =
        "INSERT INTO listLinkChapter (LINK, title, story_current) VALUES (?, ?, ?)";
      for (const link of chapterArr) {
        let retryCount = 0;
        const maxRetries = 5;
        while (retryCount < maxRetries) {
          const connection = await connect.getConnection();
          try {
            await connection.beginTransaction();
            await connection.query(sql, [link, title, story_current]);

            await connection.commit();
            connection.release();
            break;
          } catch (err) {
            await connection.rollback();
            connection.release();
            if (err.code === "ER_LOCK_DEADLOCK") {
              retryCount++;
              console.log(
                `Deadlock detected, retrying... (${retryCount}/${maxRetries})`
              );
              await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
              console.error(`Error inserting data for link ${link}:`, err);
              break;
            }
          }
        }

        if (retryCount === maxRetries) {
          console.error(
            `Reached maximum retries for link ${link}, skipping this link.`
          );
        }
      }
      await Promise.allSettled(
        chapterArr.map(async (data, index) => {
          try {
            await new Promise((resolve) => setTimeout(resolve, index * delay));
            const response = await axios.get(data, {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
              },
            });
            const $ = cheerio.load(response.data);
            const title = $(".truyen-title").text();
            const nameChapter = $(".chapter-title").text();
            const body = $(".chapter-c").html();
            $(".ads-network.ads-desktop").remove();
            const nameCHre = $(".chapter-title").attr("href");
            const slug = removeVietnameseTones(title.toLowerCase()).replace(
              / /g,
              "-"
            );
            const slugname = nameCHre.replace("https://truyenfull.io/", "");
            const [sug_1, slug_2] = slugname.split("/");
            const mumber_Chapter = slug_2.replace("chuong-", "");
            const name_chater = nameChapter.split(":")[1] || "";

            let retryCount = 0;
            const maxRetries = 5;
            let sql =
              "INSERT INTO chapter (title, name_chapter , number_chapter, content, slug ,slug_1) VALUES (?, ?, ?, ?, ?,?)";
            while (retryCount < maxRetries) {
              const connection = await connect.getConnection();
              try {
                await connection.beginTransaction();
                await connection.query(sql, [
                  title,
                  name_chater,
                  mumber_Chapter,
                  body,
                  slug,
                  slug_2,
                ]);
                await connection.commit();
                connection.release();
                this.io.emit("successChapter", { title, mumber_Chapter });
                break;
              } catch (error) {
                await connection.rollback();
                connection.release();
                if (error.code === "ER_LOCK_DEADLOCK") {
                  retryCount++;
                  console.log(
                    `Deadlock detected, retrying... (${retryCount}/${maxRetries})`
                  );
                  await new Promise((resolve) => setTimeout(resolve, delay));
                } else {
                  console.error(
                    `Error inserting data for link ${link}:`,
                    error
                  );
                  break;
                }
              }
            }
          } catch (error) {
            console.error(`Error fetching ${data}:`, error.message);
          }
        })
      );

      return res.json({ message: "crawl Success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // crawl link much
  async crawlStroryMuch(req, res, next) {
    const { story, delay } = req.body;

    try {
      // Loop through the stories sequentially
      for (let urlStory of story) {
        let chapterArr = []; // Reset chapterArr for each story
        let foundChapters = new Set(); // Reset foundChapters for each story
        let title;
        try {
          const response = await axios.get(urlStory, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
            },
          });
          const $ = cheerio.load(response.data);

          const genres = [];
          const novi = [];
          const titleH = $(".title").text();
          const description = $('*[itemprop="description"]').html();
          const imgStory = $(".book img").attr("src");
          const author = $('.info *[itemprop="author"]').text();
          const source = $(".info .source").text();
          const story_current = "truyenfull";
          const status =
            $(".info .text-success").text() + $(".info .text-primary").text();
          $('.info *[itemprop="genre"]').each((i, elem) => {
            genres.push($(elem).text());
            novi.push(removeVietnameseTones($(elem).text()));
          });
          const slug = removeVietnameseTones(titleH.toLowerCase()).replace(
            / /g,
            "-"
          );
          const arrayGenres = genres.map((genre) => {
            const slugGenres = removeVietnameseTones(
              genre.toLowerCase()
            ).replace(/ /g, "-");
            return { genres: genre, slug: slugGenres };
          });
          const ArrayGenResNovi = novi.map((genre) => ({ genres: genre }));

          // Download the image and save it locally
          let downloadImage = async (url, filePath) => {
            const response = await axios({
              url,
              method: "GET",
              responseType: "stream",
            });
            return new Promise((resolve, reject) => {
              const writer = fs.createWriteStream(filePath);
              response.data.pipe(writer);
              writer.on("finish", resolve);
              writer.on("error", reject);
            });
          };
          const imageFilePath = path.join("./public/images", `${slug}.jpg`);
          const imageStorys = imageFilePath.replace("public", "");
          await downloadImage(imgStory, imageFilePath);
          // Save liststory database
          try {
            const sqlSubpage =
              "INSERT INTO subpages (title, imgStory, author, slug, description, statusStory, source, genres,slug_category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            await connect.query(sqlSubpage, [
              titleH,
              imageStorys,
              author,
              slug,
              description,
              status,
              source,
              JSON.stringify(arrayGenres),
              JSON.stringify(ArrayGenResNovi),
            ]);
            const sqlLinkStory =
              "INSERT INTO liststory (link_story, title, story_current) VALUES (?, ?, ?)";
            await connect.query(sqlLinkStory, [
              urlStory,
              titleH,
              story_current,
            ]);
            // await connect.commit();
            // await connect.commit();
          } catch (error) {
            if (error.code === "ER_DUP_ENTRY") {
              // res.json({ message: "Story Đã tồn tại" });
              this.io.emit(
                "errorSrotyDuplicate",
                `Duplicate entry found for ${titleH}, skipping to next story...`
              );
              console.log(
                `Duplicate entry found for ${titleH}, skipping to next story...`
              );
              continue; // Skip to the next story
            } else {
              console.log(error);
              return next(new ApiError("Error inserting subpage"));
              break;
            }
          }

          // crawl category save mysql
          for (let data of arrayGenres) {
            let category = data.genres;
            let slug = data.slug;

            try {
              // Kiểm tra xem category đã tồn tại hay chưa
              const [existingCategory] = await connect.query(
                "SELECT * FROM category WHERE category = ?",
                [category]
              );

              if (existingCategory.length > 0) {
                // Nếu category đã tồn tại, emit event và tiếp tục vòng lặp
                this.io.emit(
                  "errorStoryDuplicate",
                  `Category "${category}" already exists, skipping...`
                );
                console.log(
                  `Category "${category}" already exists, skipping...`
                );
                continue; // Bỏ qua phần tử hiện tại và tiếp tục với phần tử tiếp theo
              }

              // Nếu không tồn tại, tiến hành thêm mới
              await connect.query(
                "INSERT INTO category (category, slug) VALUES (?, ?)",
                [category, slug]
              );
            } catch (error) {
              console.log(error);
              return next(new ApiError("Error inserting category"));
            }
          }

          for (let chapter = 1; true; chapter++) {
            const url = urlStory + "trang-" + chapter;
            await new Promise((resolve) => setTimeout(resolve, delay));
            const response = await axios.get(url, {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
              },
            });
            const $ = cheerio.load(response.data);
            title = $(".title").text();
            let isDuplicate = false;
            $(".list-chapter li a").each((i, link) => {
              let chapterLink = $(link).attr("href");
              if (!chapterLink || chapterLink === "") {
                isDuplicate = true;
                return false;
              } else if (foundChapters.has(chapterLink)) {
                isDuplicate = true;
              } else {
                foundChapters.add(chapterLink);
                chapterArr.push(chapterLink);
              }
            });

            if (isDuplicate) {
              break;
            }
          }
          const sql =
            "INSERT INTO listLinkChapter (LINK, title, story_current) VALUES (?, ?, ?)";
          for (const link of chapterArr) {
            let retryCount = 0;
            const maxRetries = 5;
            while (retryCount < maxRetries) {
              const connection = await connect.getConnection();
              try {
                await connection.beginTransaction();
                await connection.query(sql, [link, title, story_current]);

                await connection.commit();
                connection.release();
                break;
              } catch (err) {
                await connection.rollback();
                connection.release();
                if (err.code === "ER_LOCK_DEADLOCK") {
                  retryCount++;
                  console.log(
                    `Deadlock detected, retrying... (${retryCount}/${maxRetries})`
                  );
                  await new Promise((resolve) => setTimeout(resolve, delay));
                } else {
                  console.error(`Error inserting data for link ${link}:`, err);
                  break;
                }
              }
            }

            if (retryCount === maxRetries) {
              console.error(
                `Reached maximum retries for link ${link}, skipping this link.`
              );
            }
          }
          await Promise.allSettled(
            chapterArr.map(async (data, index) => {
              try {
                await new Promise((resolve) =>
                  setTimeout(resolve, index * delay)
                );
                const response = await axios.get(data, {
                  headers: {
                    "User-Agent":
                      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
                  },
                });
                const $ = cheerio.load(response.data);
                const title = $(".truyen-title").text();
                const nameChapter = $(".chapter-title").text();
                const body = $(".chapter-c").html();
                $(".ads-network.ads-desktop").remove();
                const nameCHre = $(".chapter-title").attr("href");
                const slug = removeVietnameseTones(title.toLowerCase()).replace(
                  / /g,
                  "-"
                );
                const slugname = nameCHre.replace("https://truyenfull.io/", "");
                const [sug_1, slug_2] = slugname.split("/");
                const mumber_Chapter = slug_2.replace("chuong-", "");
                const name_chater = nameChapter.split(":")[1] || "";

                let retryCount = 0;
                const maxRetries = 5;
                let sql =
                  "INSERT INTO chapter (title, name_chapter , number_chapter, content, slug ,slug_1) VALUES (?, ?, ?, ?, ?,?)";
                while (retryCount < maxRetries) {
                  const connection = await connect.getConnection();
                  try {
                    await connection.beginTransaction();
                    await connection.query(sql, [
                      title,
                      name_chater,
                      mumber_Chapter,
                      body,
                      slug,
                      slug_2,
                    ]);
                    await connection.commit();
                    connection.release();
                    this.io.emit("successChapter", { title, mumber_Chapter });
                    break;
                  } catch (error) {
                    await connection.rollback();
                    connection.release();
                    if (error.code === "ER_LOCK_DEADLOCK") {
                      retryCount++;
                      console.log(
                        `Deadlock detected, retrying... (${retryCount}/${maxRetries})`
                      );
                      await new Promise((resolve) =>
                        setTimeout(resolve, delay)
                      );
                    } else {
                      console.error(
                        `Error inserting data for link ${link}:`,
                        error
                      );
                      break;
                    }
                  }
                }
              } catch (error) {
                console.error(`Error fetching ${data}:`, error.message);
              }
            })
          );

          // >>>>>>>>>><<<<<<<<<<< //
        } catch (error) {
          console.log(error);
        }
      }
      return res.json({ message: "Crawl success" });
    } catch (error) {
      console.error("Error in crawlStrory:", error);
    }
  }

  // crawl category
  async crawlStroryCategory(req, res, next) {
    let allLinks = []; // Mảng chứa tất cả các link chương
    const foundChapters = new Set(); // Set để lưu các link đã tìm thấy
    const { storyCategory, delay } = req.body;
    try {
      for (let page = 1; true; page++) {
        const url = `${storyCategory}/trang-${page}`;
        // Delay giữa các request để tránh bị chặn
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Gửi yêu cầu lấy HTML
        const response = await axios.get(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          },
        });

        // Load HTML vào cheerio
        const $ = cheerio.load(response.data);

        let isDuplicatePage = false;

        // Duyệt qua các link chương
        $(".truyen-title a").each(async (i, link) => {
          let chapterLink = $(link).attr("href");
          if (!chapterLink || chapterLink === "") {
            isDuplicatePage = true; // Dừng nếu không có link chương hợp lệ
            return false;
          } else if (foundChapters.has(chapterLink)) {
            isDuplicatePage = true; // Dừng nếu đã có link này trong danh sách
          } else {
            foundChapters.add(chapterLink); // Thêm link mới vào Set
            allLinks.push(chapterLink); // Lưu link mới vào mảng
          }
        });
        console.log(allLinks);
        for (let urlStory of allLinks) {
          let chapterArr = []; // Reset chapterArr for each story
          let foundChapters = new Set(); // Reset foundChapters for each story
          let title;
          try {
            const response = await axios.get(urlStory, {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
              },
            });
            const $ = cheerio.load(response.data);

            const genres = [];
            const novi = [];
            const titleH = $(".title").text();
            const description = $('*[itemprop="description"]').html();
            const imgStory = $(".book img").attr("src");
            const author = $('.info *[itemprop="author"]').text();
            const source = $(".info .source").text();
            const story_current = "truyenfull";
            const status =
              $(".info .text-success").text() + $(".info .text-primary").text();
            $('.info *[itemprop="genre"]').each((i, elem) => {
              genres.push($(elem).text());
              novi.push(removeVietnameseTones($(elem).text()));
            });
            const slug = removeVietnameseTones(titleH.toLowerCase()).replace(
              / /g,
              "-"
            );
            const arrayGenres = genres.map((genre) => {
              const slugGenres = removeVietnameseTones(
                genre.toLowerCase()
              ).replace(/ /g, "-");
              return { genres: genre, slug: slugGenres };
            });
            const ArrayGenResNovi = novi.map((genre) => ({ genres: genre }));

            // Download the image and save it locally
            let downloadImage = async (url, filePath) => {
              const response = await axios({
                url,
                method: "GET",
                responseType: "stream",
              });
              return new Promise((resolve, reject) => {
                const writer = fs.createWriteStream(filePath);
                response.data.pipe(writer);
                writer.on("finish", resolve);
                writer.on("error", reject);
              });
            };
            const imageFilePath = path.join("./public/images", `${slug}.jpg`);
            const imageStorys = imageFilePath.replace("public", "");
            await downloadImage(imgStory, imageFilePath);
            // Save liststory database
            try {
              const sqlSubpage =
                "INSERT INTO subpages (title, imgStory, author, slug, description, statusStory, source, genres,slug_category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
              await connect.query(sqlSubpage, [
                titleH,
                imageStorys,
                author,
                slug,
                description,
                status,
                source,
                JSON.stringify(arrayGenres),
                JSON.stringify(ArrayGenResNovi),
              ]);
              const sqlLinkStory =
                "INSERT INTO liststory (link_story, title, story_current) VALUES (?, ?, ?)";
              await connect.query(sqlLinkStory, [
                urlStory,
                titleH,
                story_current,
              ]);
              // await connect.commit();
              // await connect.commit();
            } catch (error) {
              if (error.code === "ER_DUP_ENTRY") {
                // res.json({ message: "Story Đã tồn tại" });
                this.io.emit(
                  "errorSrotyDuplicate",
                  `Duplicate entry found for ${titleH}, skipping to next story...`
                );
                console.log(
                  `Duplicate entry found for ${titleH}, skipping to next story...`
                );
                continue; // Skip to the next story
              } else {
                console.log(error);
                return next(new ApiError("Error inserting subpage"));
                break;
              }
            }
            for (let chapter = 1; true; chapter++) {
              const url = urlStory + "trang-" + chapter;
              await new Promise((resolve) => setTimeout(resolve, delay));
              const response = await axios.get(url, {
                headers: {
                  "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
                },
              });
              const $ = cheerio.load(response.data);
              title = $(".title").text();
              let isDuplicate = false;
              $(".list-chapter li a").each((i, link) => {
                let chapterLink = $(link).attr("href");
                if (!chapterLink || chapterLink === "") {
                  isDuplicate = true;
                  return false;
                } else if (foundChapters.has(chapterLink)) {
                  isDuplicate = true;
                } else {
                  foundChapters.add(chapterLink);
                  chapterArr.push(chapterLink);
                }
              });

              if (isDuplicate) {
                break;
              }
            }
            const sql =
              "INSERT INTO listLinkChapter (LINK, title, story_current) VALUES (?, ?, ?)";
            for (const link of chapterArr) {
              let retryCount = 0;
              const maxRetries = 5;
              while (retryCount < maxRetries) {
                const connection = await connect.getConnection();
                try {
                  await connection.beginTransaction();
                  await connection.query(sql, [link, title, story_current]);

                  await connection.commit();
                  connection.release();
                  break;
                } catch (err) {
                  await connection.rollback();
                  connection.release();
                  if (err.code === "ER_LOCK_DEADLOCK") {
                    retryCount++;
                    console.log(
                      `Deadlock detected, retrying... (${retryCount}/${maxRetries})`
                    );
                    await new Promise((resolve) => setTimeout(resolve, delay));
                  } else {
                    console.error(
                      `Error inserting data for link ${link}:`,
                      err
                    );
                    break;
                  }
                }
              }

              if (retryCount === maxRetries) {
                console.error(
                  `Reached maximum retries for link ${link}, skipping this link.`
                );
              }
            }
            await Promise.allSettled(
              chapterArr.map(async (data, index) => {
                try {
                  await new Promise((resolve) =>
                    setTimeout(resolve, index * delay)
                  );
                  const response = await axios.get(data, {
                    headers: {
                      "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
                    },
                  });
                  const $ = cheerio.load(response.data);
                  const title = $(".truyen-title").text();
                  const nameChapter = $(".chapter-title").text();
                  const body = $(".chapter-c").html();
                  $(".ads-network.ads-desktop").remove();
                  const nameCHre = $(".chapter-title").attr("href");
                  const slug = removeVietnameseTones(
                    title.toLowerCase()
                  ).replace(/ /g, "-");
                  const slugname = nameCHre.replace(
                    "https://truyenfull.io/",
                    ""
                  );
                  const [sug_1, slug_2] = slugname.split("/");
                  const mumber_Chapter = slug_2.replace("chuong-", "");
                  const name_chater = nameChapter.split(":")[1] || "";

                  let retryCount = 0;
                  const maxRetries = 5;
                  let sql =
                    "INSERT INTO chapter (title, name_chapter , number_chapter, content, slug ,slug_1) VALUES (?, ?, ?, ?, ?,?)";
                  while (retryCount < maxRetries) {
                    const connection = await connect.getConnection();
                    try {
                      await connection.beginTransaction();
                      await connection.query(sql, [
                        title,
                        name_chater,
                        mumber_Chapter,
                        body,
                        slug,
                        slug_2,
                      ]);
                      await connection.commit();
                      connection.release();
                      this.io.emit("successChapter", { title, mumber_Chapter });
                      break;
                    } catch (error) {
                      await connection.rollback();
                      connection.release();
                      if (error.code === "ER_LOCK_DEADLOCK") {
                        retryCount++;
                        console.log(
                          `Deadlock detected, retrying... (${retryCount}/${maxRetries})`
                        );
                        await new Promise((resolve) =>
                          setTimeout(resolve, delay)
                        );
                      } else {
                        console.error(
                          `Error inserting data for link ${link}:`,
                          error
                        );
                        break;
                      }
                    }
                  }
                } catch (error) {
                  console.error(`Error fetching ${data}:`, error.message);
                }
              })
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
      // Trả kết quả sau khi hoàn tất
      res.status(200).json({
        success: true,
        message: "success",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Crawl failed", error: error.message });
    }
  }

  // async crawlStrorytestErrchapter(req, res, next) {
  //   let delay = 1000;
  //   try {
  //     let link = "https://truyenfull.io/minh-thien-ha/chuong-481/";
  //     await new Promise((resolve) => setTimeout(resolve, delay));
  //     const response = await axios.get(link, {
  //       headers: {
  //         "User-Agent":
  //           "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
  //       },
  //     });
  //     const $ = cheerio.load(response.data);
  //     const title = $(".truyen-title").text();
  //     const nameChapter = $(".chapter-title").text();
  //     const body = $(".chapter-c").html();
  //     $(".ads-network.ads-desktop").remove();
  //     const nameCHre = $(".chapter-title").attr("href");
  //     const slug = removeVietnameseTones(title.toLowerCase()).replace(
  //       / /g,
  //       "-"
  //     );
  //     const slugname = nameCHre.replace("https://truyenfull.io/", "");
  //     const [sug_1, slug_2] = slugname.split("/");
  //     const mumber_Chapter = slug_2.replace("chuong-", "");
  //     console.log(mumber_Chapter);
  //     const name_chater = nameChapter.split(":")[1] || "";

  //     let retryCount = 0;
  //     const maxRetries = 5;
  //     let sql =
  //       "INSERT INTO chapter (title, name_chapter , number_chapter, content, slug ,slug_1) VALUES (?, ?, ?, ?, ?,?)";
  //     while (retryCount < maxRetries) {
  //       const connection = await connect.getConnection();
  //       try {
  //         await connection.beginTransaction();
  //         await connection.query(sql, [
  //           title,
  //           name_chater,
  //           mumber_Chapter,
  //           body,
  //           slug,
  //           slug_2,
  //         ]);
  //         await connection.commit();
  //         connection.release();
  //         this.io.emit("successChapter", { title, mumber_Chapter });
  //         break;
  //       } catch (error) {
  //         await connection.rollback();
  //         connection.release();
  //         if (error.code === "ER_LOCK_DEADLOCK") {
  //           retryCount++;
  //           console.log(
  //             `Deadlock detected, retrying... (${retryCount}/${maxRetries})`
  //           );
  //           await new Promise((resolve) => setTimeout(resolve, delay));
  //         } else {
  //           console.error(error);
  //           break;
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async updateStory(req, res, next) {
    let sql = "SELECT * FROM liststory";
    const result = await connect.query(sql);
    const arrayStory = result[0];
    let chapterArr = [];
    let title;
    let linkUpdate = [];
    const delay = 1000;
    const foundChapters = new Set();

    try {
      for (const data of arrayStory) {
        await new Promise((dels) => setTimeout(dels, delay));
        let url = data.link_story;
        try {
          const response = await axios.get(url, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
            },
          });

          const $ = cheerio.load(response.data);
          const titleH = $(".title").text();
          const status = $(".text-success").text();
          // remove story has the word full
          if (status === "Full") {
            // await connect.query("DELETE FROM liststory WHERE title = ?", [
            //   titleH,
            // ]);
            await connect.query("DELETE FROM listlinkchapter WHERE title = ?", [
              titleH,
            ]);
            continue;
          }
          for (let chapter = 1; true; chapter++) {
            const chapterUrl = url + "trang-" + chapter;
            await new Promise((resolve) => setTimeout(resolve, delay));

            const chapterResponse = await axios.get(chapterUrl, {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
              },
            });

            const $ = cheerio.load(chapterResponse.data);
            title = $(".title").text();
            let isDuplicate = false;

            $(".list-chapter li a").each(async (i, link) => {
              let chapterLink = $(link).attr("href");
              if (!chapterLink || chapterLink === "") {
                isDuplicate = true;
                return false;
              } else if (foundChapters.has(chapterLink)) {
                isDuplicate = true;
              } else {
                foundChapters.add(chapterLink);
                chapterArr.push(chapterLink);
              }
            });

            if (isDuplicate) {
              break;
            }
          }

          const sql =
            "INSERT INTO listLinkChapter (LINK, title,story_current) VALUES (?, ?,?)";

          for (const link of chapterArr) {
            let retryCount = 0;
            const maxRetries = 5;

            while (retryCount < maxRetries) {
              const connection = await connect.getConnection();
              try {
                // Check if the link already exists
                const checkSql =
                  "SELECT COUNT(*) AS count FROM listLinkChapter WHERE LINK = ?";
                const [rows] = await connection.query(checkSql, [link]);
                if (rows[0].count > 0) {
                  connection.release();
                  break;
                }

                await connection.beginTransaction();
                await connection.query(sql, [link, title, story_current]);
                await connection.commit();
                linkUpdate.push(link);
                connection.release();
                break;
              } catch (err) {
                await connection.rollback();
                connection.release();
                if (err.code === "ER_LOCK_DEADLOCK") {
                  retryCount++;
                  console.log(
                    `Deadlock detected, retrying... (${retryCount}/${maxRetries})`
                  );
                  await new Promise((resolve) => setTimeout(resolve, delay));
                } else {
                  console.error(`Error inserting link ${link}:`, err);
                  break;
                }
              }
            }

            if (retryCount === maxRetries) {
              console.error(
                `Reached max retry count for link ${link}, skipping this link.`
              );
            }
          }
        } catch (error) {
          console.error(`Error fetching story ${url}:`, error.message);
        }
      }

      for (let datalink of linkUpdate) {
        let url = datalink;
        let retryCount = 0;
        const maxRetries = 5;
        await new Promise((resolve) => setTimeout(resolve, index * delay));
        const response = await axios.get(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          },
        });
        const $ = cheerio.load(response.data);
        const title = $(".truyen-title").text();
        const nameChapter = $(".chapter-title").text();
        const body = $(".chapter-c").html();
        $(".ads-network.ads-desktop").remove();
        const nameCHre = $(".chapter-title").attr("href");
        const slugname = nameCHre.replace("https://truyenfull.io", "");
        let sql =
          "INSERT INTO chapter (title, name_chapter , number_chapter, content, slug ,slug_1) VALUES (?, ?, ?, ?, ?, ?)";
        while (retryCount < maxRetries) {
          const connection = await connect.getConnection();
          try {
            connection.query(sql, [title, nameChapter, body, slugname]);
            await connection.commit();
            connection.release();
            this.io.emit("successChapter", { title, nameChapter });
            break;
          } catch (error) {
            await connection.rollback();
            connection.release();
            if (err.code === "ER_LOCK_DEADLOCK") {
              retryCount++;
              console.log(
                `Deadlock detected, retrying... (${retryCount}/${maxRetries})`
              );
              await new Promise((resolve) => setTimeout(resolve, delay)); // Chờ một chút trước khi thử lại
            } else {
              console.error(`Lỗi khi chèn dữ liệu cho link ${link}:`, err);
              break;
            }
          }
        }
      }
      // CRON TỰ ĐỘNG UPDATE CHAPTER  --> AUTO UPDATE CHAPTER AFTER 2 MINUTE
      // cron.schedule('*/2 * * * *', () => {
      //     console.log('Succerr 2 minute cron');
      // });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CrawlManuallyController;
