const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes.js");
const commentRoutes = require("./api/commentRoutes.js");
const postRoutes = require("./api/postRoutes.js");
const userRoutes = require("./api/userRoutes.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
