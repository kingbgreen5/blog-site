const router = require('express').Router();
const { Blog } = require('../../models');



//                                                CREATE NEW BLOG POST                           
router.post('/', async (req, res) => {
    try {
      const dbBlogData = await Blog.create({
        post_title: req.body.title,
        contents: req.body.content,
        post_date: new Date(),
        user_id: req.body.userId
      });
      console.log
        res.status(200).json(dbBlogData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;
