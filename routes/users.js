const router = require('koa-router')()
// router.prefix('/users')
const crypto = require('crypto');
const userModel = require('../server/user');

router.post('/api/login', async function (ctx, next) {
	const { username, password } = ctx.request.body;
	const hash = crypto.createHash('md5');
	hash.update(password);
	const  user =  await userModel.getUser(username);
	if(!user){
		ctx.body = {
			success: 0,
			message: '账号错误',
			data: ''
		}
		return;
	}
	
	if(user.password != hash.digest('hex')){
		ctx.body = {
			success: 0,
			message: '密码错误',
			data: ''
		}
		return;
	}

	ctx.body = {
		success: 200,
		message: '成功',
		data: ''
	}
})

router.get('/api/currentAcount', async function (ctx, next) {
	ctx.body = {
		success: 200,
		message: '成功',
		data: {
			name: 'admin',
			userid: 1
		}
	}
})
module.exports = router
