const router = require('express').Router();

const { Blog, User, Comment } = require('../models');

// GET all Blog posts
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
        },
      ],
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );
    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

// GET One Blog Post
router.get('/blog/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the gallery
    try {
      const dbBlogData = await Blog.findByPk(req.params.id, {
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
      const blog = dbBlogData.get({ plain: true });
      res.render('blog', { blog, loggedIn: req.session.loggedIn, currentUserId: req.session.user.id });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

       // {
          //   model: Comments,
          //   attributes: [
          //     'contents',
          //     'post_date',
          //     'user_id',
          //     'blog_id',
          //   ],
          // },