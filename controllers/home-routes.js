const router = require('express').Router();
const { log } = require('handlebars');
const { Blog, Gallery, Painting, User } = require('../models');

// GET all Blog posts
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
      // include: [
      //   {
      //     model: Painting,
      //     attributes: ['filename', 'description'],
      //   },
      // ],
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

// GET One post
router.get('/blog/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the gallery
    try {
      const dbBlogData = await Blog.findByPk(req.params.id, {
        // include: [
        //   {
        //     model: Painting,
        //     attributes: [
        //       'id',
        //       'title',
        //       'artist',
        //       'exhibition_date',
        //       'filename',
        //       'description',
        //     ],
        //   },
        // ],
      });
      const blog = dbBlogData.get({ plain: true });
      res.render('blog', { blog, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});






// // GET USER
// router.get('/users', async (req, res) => {
//   console.log('Dashboard Route Hit');
//   try {
//     const user = await User.findAll({
//       // include: [
//       //   {
//       //     model: Painting,
//       //     attributes: ['filename', 'description'],
//       //   },
//       // ],
//     });

//     // const user = dbBlogData.map((blog) =>
//     //   blog.get({ plain: true })
//     // );

//     res.render('dashboard', {
//       user,
//       loggedIn: req.session.loggedIn,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }

// });


























// // GET one painting
// router.get('/painting/:id', async (req, res) => {
//   // If the user is not logged in, redirect the user to the login page
//   if (!req.session.loggedIn) {
//     res.redirect('/login');
//   } else {
//     // If the user is logged in, allow them to view the painting
//     try {
//       const dbPaintingData = await Painting.findByPk(req.params.id);

//       const painting = dbPaintingData.get({ plain: true });

//       res.render('painting', { painting, loggedIn: req.session.loggedIn });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json(err);
//     }
//   }
// });

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
