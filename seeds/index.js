const sequelize = require('../config/connection');
const seedBlogs = require('./blogSeeds');
const seedUsers = require('./userData');
const seedComments =require('./commentSeeds')

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers()
  await seedBlogs()
  await seedComments()

  process.exit(0);
};

seedAll();
