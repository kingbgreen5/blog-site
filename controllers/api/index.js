const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogRoutes = require('./blog');
const commentRoutes= require('./comment')

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);


module.exports = router;
