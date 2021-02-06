const router = require('koa-router')()
const axios = require('axios');

const getProduct = async (str) => {
	return await axios.get('https://mapi-rp.vip.com/vips-mobile/rest/shopping/wxapp/product/module/list/v2', {
		params: {
			'app_name': 'shop_wap',
			'app_version': '4.0',
			'warehouse':'VIP_SH',
			'api_key': '8cec5243ade04ed3a02c5972bcda0d3f',
			'productIds': str,
			'scene': 'brand',
			'standby_id': 'nature',
		},
		headers: {
			'Referer': 'https://m.vip.com'
		}
	})
}
router.get('/myApi/getList', async (ctx, next) => {
	const {
		brandId,
		categoryId,
		page
	} = ctx.query;
	const fromIndex = (page - 1) * 120 || 0;
	console.log(fromIndex)
	const {
		data
	} = await axios.get('https://mapi.vip.com/vips-mobile/rest/shopping/wap/product/list/rank/v2', {
		params: {
			'app_name': 'shop_wap',
			'app_version': 4.0,
			'api_key': '8cec5243ade04ed3a02c5972bcda0d3f',
			'mobile_platform': 2,
			'source_app': 'yd_wap',
			'warehouse': 'VIP_SH',
			'fdc_area_id': 103101101,
			'province_id': 103101,
			'mars_cid': '1611651641997_363f8de04dbfa0d2f495dfff4d0f8804',
			'mobile_channel': 'mobiles-%7C%7C',
			'standby_id': 'nature',
			'brandId': brandId || 100786243,
			'sort': 6,
			categoryId,
			'fromIndex': fromIndex,
			'abtestId': 13100000,
			'salePlatform': 2,
			'wap_consumer': 'A1',
			'marketChannel': 'nature',
			'functions': 'mobileImage%2ClistImg%2CheadInfoV3Wx%2CfallingTag',
			'isGetBrandInfo': 1,
			'mvip': true,
			'_': 1611651657,
		},
		headers: {
			'Referer': 'https://m.vip.com'
		}
	})

	let list = data.data.products;
	list = list.map(item => item.pid);
	const fristProduct = await getProduct(list.slice(0, 40).join())
	const lastProduct = await getProduct(list.slice(40).join())
	
	const newList = [].concat(fristProduct.data.data.products, lastProduct.data.data.products)

	const total = data.data.total;
	ctx.body = {
		success: 200,
		message: '成功',
		total,
		data: newList
	}
})

router.get('/myApi/getCategoryList', async (ctx, next) => {
	const {
		brandId,
	} = ctx.query;
	const {
		data
	} = await axios.get('https://mapi-rp.vip.com/vips-mobile/rest/shopping/brand/product/hot/category/filter/v1', {
		params: {
			'app_name': 'shop_wap',
			'app_version': '4.0',
			'api_key': '8cec5243ade04ed3a02c5972bcda0d3f',
			'mobile_platform': 2,
			'source_app': 'yd_wap',
			'warehouse': 'VIP_SH',
			'fdc_area_id': 103101101,
			'province_id': 103101,
			'mars_cid': '1608885621597_609e5cc743c327c77470d52352fede6f',
			'mobile_channel': 'mobiles-adp:C01V4mf3jhdsri14:@_@1611729283895:mig_code::ac01eg0zps8krl99ls97j7pur75y7vr8||',
			'standby_id': 'nature',
			'brandId': brandId || 100786243,
			'mvip': true,
			'_': 1611800545,
		},
		headers: {
			'Referer': 'https://m.vip.com'
		}
	})

	ctx.body = {
		success: 200,
		message: '成功',
		data: data.data.hotCategory
	}
})
module.exports = router
