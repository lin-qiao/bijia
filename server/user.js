const Sequelize = require('sequelize');
const sequelize = require('../config/db.js'); // 引入todolist的表结构
const userModel = '../schema/user.js';

const User = require(userModel)(sequelize, Sequelize.DataTypes)


const getUser = async function (username) {
  return await User.findOne({
    'where':{'username':username}
  });
}


module.exports = {
  getUser
}