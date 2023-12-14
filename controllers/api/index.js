const router = require('express').Router();

const userRoutes = require('./user-routes');
const blogRoutes = require('./blog');
const commentRoutes= require('./comment')
const editRoutes= require('./edit')

router.use('/users', userRoutes);
router.use('/blog', blogRoutes);
router.use('/comment', commentRoutes);
router.use('/edit', editRoutes);

module.exports = router;
