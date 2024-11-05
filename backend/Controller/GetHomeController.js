const experss = require("express");
const connect = require("../Config/connectMySql");
const ApiError = require("../Config/ApiError");

class GetHomeController {
  async getHome(req, res, next) {
    try {
      const [
        [resultNew],
        [storyUpdate],
        [resultStorySuccess],
        [viewDay],
        [viewToday],
        [viewmoth],
        [viewyear],
      ] = await Promise.all([
        // story gim
        connect.query(
          `SELECT s.id, s.title, s.imgStory, s.slug,s.description, s.statusStory,s.time, 
                    (SELECT COUNT(c.id) FROM chapter c WHERE c.slug = s.slug) AS totalChapters
                        FROM subpages s
                        WHERE s.gim = 1
                        LIMIT 18;`
        ),
        // storyUpdate
        connect.query(`
                    SELECT 
                        s.id,s.title,s.time_update,s.time,s.genres,s.slug,
                        (
                            SELECT COUNT(c.id)
                            FROM chapter c
                            WHERE c.slug = s.slug
                        ) AS totalChapters,
                        c.slug AS chapter_slug, 
                        c.title AS chapter_title, 
                        c.time_update AS chapter_time_update
                    FROM subpages s
                    JOIN (
                        SELECT c1.*
                        FROM chapter c1
                        INNER JOIN (
                            SELECT slug, MAX(time_update) AS max_time_update
                            FROM chapter
                            GROUP BY slug
                        ) c2
                        ON c1.slug = c2.slug AND c1.time_update = c2.max_time_update
                    ) c
                    ON s.slug = c.slug
                    ORDER BY c.time_update DESC
                    LIMIT 20
                `),
        // resultStorySuccess
        connect.query(
          "SELECT s.id, s.title,s.imgStory,s.slug,s.statusStory,(SELECT COUNT(c.id)FROM chapter c WHERE c.slug = s.slug)AS totalChapters From subpages s WHERE statusStory = 'Full' LIMIT 12"
        ),
        // viewDay
        connect.query(
          `SELECT id,title,imgStory, slug, statusStory FROM subpages ORDER BY view_day DESC LIMIT 10`
        ),
        // viewToday
        connect.query(
          `SELECT id,title,imgStory, slug, statusStory FROM subpages ORDER BY view_today DESC LIMIT 10`
        ),
        // viewmoth
        connect.query(
          `SELECT id,title,imgStory, slug, statusStory FROM subpages ORDER BY view_month DESC LIMIT 10`
        ),
        // viewyear
        connect.query(
          `SELECT id,title,imgStory, slug, statusStory FROM subpages ORDER BY view_year DESC LIMIT 10`
        ),
      ]);
      //   result
      res.status(200).json({
        message: "success",
        dataNew: resultNew,
        dataUpdate: storyUpdate,
        dataStorySuccess: resultStorySuccess,
        topView: {
          viewDay,
          viewToday,
          viewmoth,
          viewyear,
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new GetHomeController();
