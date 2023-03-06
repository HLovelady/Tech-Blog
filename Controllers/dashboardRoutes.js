const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("main", {
      posts, //...?
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"], //??
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("single-post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/main");
    return;
  }
  res.render("login");
});

module.exports = router;
