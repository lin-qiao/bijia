
const schedule = require('node-schedule');
const listModel = require('../server/list');
const {
	getList,
	getNumber,
	getDeiwu,
	getCategoryList
} = require('./request');


const brandList = ['10000269', '10000652', '10000542', '10004114','10000721','10000630', '10006920'];

const getData = async () => {
	brandList.forEach(async item => {
		const { total } = await getList(item, 0);

		for(let i= 0; i < Math.ceil(total / 80); i++){
			let { list } = await getList(item, i);
			for(const obj of list){
				obj.goodsCode = await getNumber(obj.productId);
				const data = await getDeiwu(obj.goodsCode)
				obj.deiwuName = data? data.title : '';
				obj.deiwuImg = data? data.logoUrl : '';
				obj.deiwuPrice = data? data.price? data.price : 0 : 0;
				obj.vipPrice = obj.price? obj.price.couponPrice? obj.price.couponPrice * 100 : obj.price.salePrice * 100 : 0;
				obj.deiwuSales = data? data.soldNum : '';
				obj.deiwuId = data? data.productId : '';
				obj.deiwuCode = data? data.articleNumber : '';
				obj.differencePrice =  obj.deiwuPrice - obj.vipPrice;
				obj.brand = item;
				obj.type = null;
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

getData()


schedule.scheduleJob('0 0 1 * * *', () => { 
	getData()
})
