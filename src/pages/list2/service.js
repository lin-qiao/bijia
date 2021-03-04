import request from '@/utils/request'
export async function getDeiwu(params) {
	console.log(params)
  return request('/api/getDeiwu', {
	params
  });
}


