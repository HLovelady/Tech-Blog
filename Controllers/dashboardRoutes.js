
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'], //May not need?
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('main', { 
      posts, //...?
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],//??
        },
        {
          model: Comment,
          include: [User]
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('single-post', { //placeholder for now (create new handlebar view)
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => { //tie to login button
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/main');
    return;
  }

  res.render('login');
});

module.exports = router;
