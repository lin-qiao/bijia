const router = require('koa-router')()
const axios = require('axios');
const getQueryStr = require('../util/getQuery');
const { findAll } = require('../server/list');

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
router.get('/api/getList', async (ctx, next) => {
	const {
		brandId = '100786243',
		page = 1,
		size = 100,
	} = ctx.query;

	const {count, rows } =  await findAll(brandId, page, size);
	ctx.body = {
		success: 200,
		message: '成功',
		total: count,
		data: rows
	}
})

router.get('/api/getCategoryList', async (ctx, next) => {
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


router.get('/api/getDeiwu', async (ctx, next) => {
	const {
		code,
	} = ctx.query;
	
	const queryStr = getQueryStr({
	  title: code,
	  page: 0,
	  limit: 20,
	  showHot: -1,
	  sortType: 1,
	  sortMode: 1,
	  unionId: "",
	});
	const { data } = await axios.get('https://app.poizon.com/api/v1/h5/search/fire/search/list?' + queryStr, {
	  headers:{
		  'Host': 'app.poizon.com',
		  'accept': '*/*',
		  'content-type': 'application/x-www-form-urlencoded',
		  'referer': 'https://servicewechat.com/wx3c12cdd0ae8b1a7b/117/page-frame.html',
		  'appid': 'wxapp',
		  'appversion': '4.4.0',
		  'wxapp-login-token': '3f885cf3|5805b23362561089694d1976c3f2ea84|1843f86c|13d7302d',
		  'accept-language': 'zh-cn',
		  'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.12(0x17000c2f) NetType/WIFI Language/zh_CN'
	  }
	});
	ctx.body = {
		success: 200,
		message: '成功',
		data: data.data.productList
	}
})

module.exports = router
