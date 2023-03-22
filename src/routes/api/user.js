/**
 * @description user api
 * @author fhj
*/

const router = require('koa-router')()
const { isExist,register, login,deleteCurrentUser, changeUserInfo } = require('../../controller/user')
const { loginCheck } = require('../../middlewares/loginChecks')
const {genValidator} = require('../../middlewares/validator')
const { isTest } = require('../../utils/env')
const  validateUser  = require('../../validator/user')

router.prefix('/api/user',)

router.post('/register',genValidator(validateUser), async(ctx, next) => {
    const {userName, password,gender} = ctx.request.body

    // 注册 controller
    ctx.body = await register({userName, password,gender})

})

// 用户是否存在 
router.post('/isExist', async(ctx, next) => {
    const {userName} = ctx.request.body 
    //controller 
    // ctx.body = xxx
    ctx.body = await isExist(userName)
})

// 登陆 
router.post('/login', async (ctx, next) => {
    const {userName, password} = ctx.request.body

    // controller
    ctx.body = await login(ctx, userName, password)
})

// 删除 
router.post('/delete',loginCheck, async (ctx, next) => {
    // 测试环境 可删除 
    if(isTest){
        // 仅登陆的用户 删除自己
        const {userName} = ctx.session.userInfo
        // controller
        ctx.body =   await deleteCurrentUser(userName)
    }

})

// 修改个人信息 
router.patch('/changeInfo',loginCheck,genValidator(validateUser),async (ctx, next) => {
    const {nickName, city, picture} = ctx.request.body

    // controller
    ctx.body = await changeUserInfo(ctx,{nickName, city, picture})
})


module.exports = router