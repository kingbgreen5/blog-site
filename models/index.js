const User = require('./User');
const Blog =  require('./BlogModel');


User.hasMany(Blog, {
    foreignKey: 'user_id',
});

Blog.belongsTo(User, {
      foreignKey: 'user_id',
    });
    
module.exports = { Blog, User };
