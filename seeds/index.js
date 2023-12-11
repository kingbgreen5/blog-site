const sequelize = require('../config/connection');
const seedBlogs = require('./blogSeeds');
const seedUsers = require('./userData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers()
  await seedBlogs()


  process.exit(0);
};

seedAll();
