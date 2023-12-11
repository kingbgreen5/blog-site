const { User } = require('../models');

const userdata = 

[
  {
    "username": "Jeff",
    "email": "Jeff@hotmail.com",
    "password": "$2b$10$Spt/7nk4VYPtbjTdmm428uyHsMxOtadnOs9L/jP0G1LkDmniZm82G"
  },
  {
    "username": "Ken",
    "email": "Ken@gmail.com",
    "password": "$2b$10$Spt/7nk4VYPtbjTdmm428uyHsMxOtadnOs9L/jP0G1LkDmniZm82G"
  },
  {
    "username": "user",
    "email": "user@email.com",
    "password": "$2b$10$Spt/7nk4VYPtbjTdmm428uyHsMxOtadnOs9L/jP0G1LkDmniZm82G"
  }
]

const seedUsers = () => User.bulkCreate(userdata);


module.exports = seedUsers;
