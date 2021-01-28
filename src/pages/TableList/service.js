import request from '@/utils/request'
import getQueryStr from "@/util/getQuery";
import sign from "@/util/sign";
export async function getList(params) {
  return request('/myApi/getList', {
	params
  });
}

export async function getCategory(params) {
  return request('/myApi/getCategoryList', {
	params
  });
}

export async function getDetail(params) {
  return request('/shopping/wap/product/detail/v5', {
    params,
  });
}

export async function getPrice(params) {
  return request('/shop/goods/vendorSkuList/v4', {
    params,
  });
}

export async function searchList(title) {
	const queryStr = getQueryStr({
	  title: title,
	  page: 0,
	  limit: 20,
	  showHot: -1,
	  sortType: 1,
	  sortMode: 1,
	  unionId: "",
	});
  return request('/api/v1/h5/search/fire/search/list?' + queryStr, {
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
}


