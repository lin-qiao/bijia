
const schedule = require('node-schedule');
const listModel = require('../server/list');
const {
	getList,
	getNumber,
	getDeiwu,
	getCategoryList
} = require('./request');

const brandList = ['100786243', '100722917', '100908165', '100926957', '100926915', '100926931'];

const getData = async () => {
	brandList.forEach(async item => {
		const { total } = await getList(item, 0);
		const categoryList = await getCategoryList(item);
		for(let i= 0; i < Math.ceil(total / 80); i++){
			let { list } = await getList(item, i);
			for(const obj of list){
				obj.goodsCode = await getNumber(obj.productId);
				console.log(obj.goodsCode)
				const data = await getDeiwu(obj.goodsCode)
				obj.deiwuName = data? data.title : '';
				obj.deiwuImg = data? data.logoUrl : '';
				obj.deiwuPrice = data? data.price? data.price : 0 : 0;
				obj.vipPrice = obj.price? obj.price.salePrice * 100 : 0;
				obj.deiwuSales = data? data.soldNum : '';
				obj.deiwuId = data? data.productId : '';
				obj.deiwuCode = data? data.articleNumber : '';
				obj.differencePrice =  obj.deiwuPrice - obj.vipPrice;
				obj.brand = item;
				obj.type = categoryList.filter(category => category.id == obj.categoryId)[0];
				obj.stock = obj.stockLabel? obj.stockLabel.value : '';
				
			}
			
			list = list.map(item => ({
				goods_name: item.title,
				brand: item.brand,
				type: item.type,
				goods_img: item.smallImage,
				goods_code: item.goodsCode,
				stock: item.stock,
				vip_price: item.vipPrice,
				deiwu_name: item.deiwuName,
				deiwu_img: item.deiwuImg,
				deiwu_price: item.deiwuPrice,
				deiwu_sales: item.deiwuSales,
				deiwu_code: item.deiwuCode,
				difference_price: item.differencePrice,
				deiwu_id: item.deiwuId,
				vip_id: item.productId,
				create_time: new Date()
			}))
			await listModel.bulkCreate(list)
		}
		
	})
	
}



schedule.scheduleJob('2 * * * * *', () => { 
	console.log(111)
	getData()
})
