/**
 * @description user api
 * @author fhj
*/

const router = require('koa-router')()
const { isExist,register, login,deleteCurrentUser, changeUserInfo, changePassword, logout } = require('../../controller/user')
const { getFollowers } = require('../../controller/user-relation')
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

// 修改密码
router.patch('/changePassword',loginCheck,genValidator(validateUser),async(ctx, next) => {
    const {password,newPassword} = ctx.request.body
    const {userName} = ctx.session.userInfo

    // controller
    ctx.body = await changePassword(userName, password, newPassword)
})

// 退出登陆
router.post('/logout',loginCheck, async(ctx, next) => {
    ctx.body = await logout(ctx)
    // controller
})

// 获取 @  关注人 列表
router.get('/getAtList',loginCheck, async(ctx, next) => {
    // controller
    const {id:userId} = ctx.session.userInfo
    const result = await getFollowers(userId)
    const {followerList} = result.data

    const list = followerList.map(user => {
        return `${user.nickName} - ${user.userName}`
    })
    // 格式 如 ['张三'-'zhangsan']

    ctx.body = list
})

module.exports = router