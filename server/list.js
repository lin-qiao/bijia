const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const sequelize = require('../config/db.js'); // 引入todolist的表结构
const listModel = '../schema/list.js';

const List = require(listModel)(sequelize, Sequelize.DataTypes)


const bulkCreate = async function (list) {
	return await List.bulkCreate(list);
}

const findAll = async function(brandId, page, size){
	size = Math.abs(size >> 0);
	page = Math.abs(page >> 0);
	return await List.findAndCountAll({
		where: {
			brand: brandId,
			deiwu_sales: {
				[Op.gt]: 100	
			},
			create_time:  new Date()
		},
		order: [
			['difference_price', 'DESC']
		],
		limit: size,
		offset: size * (page - 1)
	});
}
module.exports = {
  bulkCreate,
  findAll
}