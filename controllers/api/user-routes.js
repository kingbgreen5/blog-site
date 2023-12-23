const router = require('express').Router();
const { log } = require('handlebars');

const { Blog, User } = require('../../models');




//                                                          GET USER DASHBOARD
router.get('/', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {

  userID= req.session.user.id

  try {
    const dbUserData = await User.findByPk(userID, {         // GETS USER DATA
      include: [
        {
          model: Blog,                // GETS THE BLOGS ASSOCIATED WITH THE USER AND INCLUDES THEM
          attributes: [
            'id',
            'post_title',
            'post_date'
          ],
        },
      ],
    })

    const user = dbUserData.get({ plain: true });
    // console.log(dbUserData);
    res.render('dashboard', {user,
      loggedIn: req.session.loggedIn,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}});



//                                                CREATE NEW USER                                   
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = dbUserData       // saves user data to req.session.user to be used later

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user = dbUserData       // saves user data to req.session.user to be used later


      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
        console.log('USERDATA:' + dbUserData)
        // console.log(req.session.user);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
