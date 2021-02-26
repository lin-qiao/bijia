const Sequelize = require('sequelize');
const sequelize = require('../config/db.js'); // 引入todolist的表结构
const listModel = '../schema/list.js';

const List = require(listModel)(sequelize, Sequelize.DataTypes)


const bulkCreate = async function (list) {
	return await List.bulkCreate(list);
}
module.exports = {
  bulkCreate
}