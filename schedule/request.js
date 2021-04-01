
const axios = require('axios');
const getQueryStr = require('../util/getQuery');

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

const getList = async (brandId, page) => {
	const pageOffset = page * 120 || 0;
	const {
		data
	} = await axios.get('https://mapi-rp.vip.com/vips-mobile/rest/product/brandstore/product/rank', {
		params: {
			app_name:'shop_wap',
			app_version:'4.0',
			api_key:'8cec5243ade04ed3a02c5972bcda0d3f',
			mobile_platform:'2',
			source_app:'yd_wap',
			warehouse:'VIP_SH',
			fdc_area_id:'103101101',
			province_id:'103101',
			mars_cid:'1616742667576_49e3f20f91449699814e14f9bcf539cc',
			mobile_channel:'mobiles-||',
			standby_id:'nature',
			functions:'id2str',
			sort:'',
			brandStoreSn:brandId,
			pageOffset,
			mvip:true,
			_:1617169598
		},
		headers: {
			'Referer': 'https://m.vip.com'
		}
	})
	
	let list = data.data.productIds;
	let newList = [];
	
	if(list.length){
		if(list.length <= 40){
			const product = await getProduct(list.join())
			newList = product.data.data.products
		}else{
			const fristProduct = await getProduct(list.slice(0, 40).join())
			const centerProduct = await getProduct(list.slice(40, 80).join()) 
			const lastProduct = await getProduct(list.slice(80).join())
			newList = [].concat(fristProduct.data.data.products, centerProduct.data.data.products, lastProduct.data.data.products)
		}
	}
	return {
		list: newList,
		total: data.data.total
	}
	
}


const getNumber = async(productId) => {
	const {
		data
	} = await axios.get('https://mapi.vip.com/vips-mobile/rest/shopping/wap/product/detail/v5', {
		params: {
			api_key: '8cec5243ade04ed3a02c5972bcda0d3f',
			productId
		},
	})
	return data.data.product.merchandiseSn
}


const getDeiwu = async(code) => {
	const queryStr = getQueryStr({
	  title: code,
	  page: 0,
	  limit: 20,
	  showHot: -1,
	  sortType: 1,
	  sortMode: 1,
	  unionId: "",
	});
	const {data } = await axios.get('https://app.poizon.com/api/v1/h5/search/fire/search/list?' + queryStr, {
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
	return  data.data.productList[0] || {}
}


const getCategoryList = async(brandId) => {
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
	return data.data.hotCategory
		
}


module.exports = {
	getList,
	getNumber,
	getDeiwu,
	getCategoryList
	
}
