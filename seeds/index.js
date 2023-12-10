const sequelize = require('../config/connection');
// const seedGallery = require('./galleryData');
// const seedPaintings = require('./paintingData');
const seedBlogs = require('./blogSeeds');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  // await seedGallery();

  // await seedPaintings();

  await seedBlogs()

  process.exit(0);
};

seedAll();
