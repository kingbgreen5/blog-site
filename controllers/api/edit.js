const router = require('express').Router();
const { Blog } = require('../../models');




// GET One Blog Post
router.get('/edit/:id', async (req, res) => {
    // If the user is not logged in, redirect the user to the login page
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      console.log('edit route hit');
      try {
        const dbBlogData = await Blog.findByPk('req.params.id', {
          include: [
            {
              model: User,
              attributes: [
                'id',
                'username',
              ],
            },
            {
              model: Comment,
              attributes: [
                'contents',
                'post_date',
                'user_id',
                'blog_id',
              ],
              include: [
                {
                  model: User,
                  attributes: ['username'],
                },
              ],
            },
          ],
        });
        console.log(dbBlogData);
        const blog = dbBlogData.get({ plain: true });
        res.render('blog', { blog, loggedIn: req.session.loggedIn, currentUserId: req.session.user.id });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  });
  
  module.exports = router;

 
