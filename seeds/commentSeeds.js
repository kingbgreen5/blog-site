const { Comment } = require('../models');

const commentData = [
  {
    contents: 'First Comment',
    post_date: '05/03/1988',
    user_id: 1,
    blog_id: 1
  },
  {
    contents: 'Second Comment',
    post_date: "05/04/1988",
    user_id: 2,
    blog_id: 1
  },
  {
    contents: 'Third Comment',
    post_date: "05/04/1988",
    user_id: 1,
    blog_id: 1
  },
];

const seedComments = () => Comment.bulkCreate(commentData);


module.exports = seedComments;
