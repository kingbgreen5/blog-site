const router = require('express').Router();
const { Comment } = require('../../models');



//                                                CREATE NEW BLOG POST                           
router.post('/', async (req, res) => {
    try {
      const dbCommentData = await Comment.create({
        contents: req.body.content,
        post_date: new Date(),
        user_id: req.session.user.id,
        blog_id: req.body.blogId
      });
      console.log
        res.status(200).json(dbCommentData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;
