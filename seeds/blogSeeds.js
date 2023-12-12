const { Blog } = require('../models');

const blogdata = [
  {
    post_title: 'Blog1',
    contents: 'First Blog',
    post_date: '05/03/1988',
    user_id: 1
  },
  {
    post_title: 'Blog2',
    contents: 'Second Blog',
    post_date: "05/04/1988",
    user_id: 2
  },
  {
    post_title: 'Blog3',
    contents: 'Third Blog',
    post_date: "05/04/1988",
    user_id: 3
  },
];

const seedBlogs = () => Blog.bulkCreate(blogdata);


module.exports = seedBlogs;
