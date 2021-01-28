/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
	dev: {
		'/myApi/': {
			target: 'http://localhost:3000',
			changeOrigin: true,
			pathRewrite: {
				'^': '',
			},
		},
		'/vip/': {
			target: 'http://api.tbk.dingdanxia.com',
			changeOrigin: true,
			pathRewrite: {
				'^': '',
			},
		},
		'/shopping/': {
			target: 'https://mapi.vip.com/vips-mobile/rest',
			changeOrigin: true,
			pathRewrite: {
				'^': '',
			},
		},
		'/shop/': {
			target: 'https://mapi-rp.vip.com/vips-mobile/rest',
			changeOrigin: true,
			pathRewrite: {
				'^': '',
			},
		},
		'/products/': {
			target: 'http://api.tanhuos.com',
			changeOrigin: true,
			pathRewrite: {
				'^': '',
			},
		},
		'/api/': {
			target: 'https://app.poizon.com',
			changeOrigin: true,
			pathRewrite: {
				'^': '',
			},
		}
	},
	test: {
		'/vip/': {
			target: 'http://api.tbk.dingdanxia.com',
			changeOrigin: true,
			pathRewrite: {
				'^': '',
			},
		},
	},
	pre: {
		'/api/': {
			target: 'your pre url',
			changeOrigin: true,
			pathRewrite: {
				'^': '',
			},
		},
	},
};
