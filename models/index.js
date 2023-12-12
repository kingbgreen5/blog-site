const User = require('./User');
const Blog =  require('./BlogModel');
const Comment = require('./CommentModel');

User.hasMany(Blog, {
    foreignKey: 'user_id',
});

Blog.belongsTo(User, {
      foreignKey: 'user_id',
});
    

// comment
User.hasMany(Comment, {
    foreignKey: 'user_id',
});
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});
  


Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
});
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
});
  

module.exports = { Blog, User, Comment };
