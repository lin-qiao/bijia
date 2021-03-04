const {
	Op,
	DataTypes,
} = require("sequelize");
const sequelize = require('../config/db.js'); // 引入todolist的表结构
const listModel = '../schema/list.js';

const List = require(listModel)(sequelize, DataTypes)


const bulkCreate = async function(list) {
	return await List.bulkCreate(list);
}

const findAll = async function(brandId, page, size) {
	size = Math.abs(size >> 0);
	page = Math.abs(page >> 0);
	return await List.findAndCountAll({
		where: {
			[Op.and]: [
				sequelize.where(sequelize.col('goods_code'), sequelize.col('deiwu_code')),
				{brand: brandId},
				{deiwu_sales: {
					[Op.gt]: 500
				}},
				{difference_price: {
					[Op.gt]: 5000
				}},
				{create_time: new Date()}	
			]
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
