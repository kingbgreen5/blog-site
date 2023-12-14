const router = require('express').Router();
const { Blog } = require('../../models');

//                                                            BLOG POST                           
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



//                                                           BLOG PUT
  router.put('/:id', async (req, res) => {
    try {
      const blog = await Blog.findByPk(req.params.id);
      if (blog) {
        await blog.update({
          post_title: req.body.title,
          contents: req.body.content,
          post_date: new Date(),
          user_id: req.body.userId
        });

        res.status(200).json({ message: 'Blog updated'});
      } else {
        res.status(404).json({ message: 'Blog not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
 
  
//                                                        BLOG DELETE
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
