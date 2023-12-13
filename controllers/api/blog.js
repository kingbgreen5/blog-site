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


  router.delete ('/:id', async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!blogData) {
        res.status(404).json({ message: 'No Blog wit this ID!' });
        return;
      }
      res.status(200).json(blogData);
      console.log('Blog Deleted')
    } catch (err) {
      res.status(500).json(err);
    }
  });
  



  module.exports = router;

 

