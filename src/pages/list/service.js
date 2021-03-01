import request from '@/utils/request'
export async function getList(params) {
  return request('/api/getList', {
	params
  });
}


