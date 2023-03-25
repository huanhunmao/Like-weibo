/**
 * @description 微博 view 路由
 * @author mark老师
 */
const jwtToken = require('jsonwebtoken')
const router = require('koa-router')()
const { loginRedirect, loginCheck } = require('../../middlewares/loginChecks')
const { isExist } = require('../../controller/user')
const util = require('util')
const verify = util.promisify(jwtToken.verify)

// 模拟登陆
// router.post('/logining', async (ctx,next) => {
//     const {userName, password} = ctx.request.body

//     let userInfo

//     if(userName === 'zhangsan' && password === '123'){
//         userInfo = {
//             userId: 1,
//             userName: 'zhangsan',
//             nickName:'张三',
//             age:20
//         }
//     }

//     // 加密 userinfo 
//     let token 
//     if(userInfo){
//         token = jwtToken.sign(userInfo,SECRET,{expiresIn:'1h'} )
//     }
        
//     if(!userInfo){
//         ctx.body = {
//             errno:-1,
//             message:'登陆失败'
//         }
//         return 
//     }

//     ctx.body = {
//         errno: 0,
//         data:token
//     }
// })

// 获取 用户信息 携带 token 
// router.get('/getUserInfo', async (ctx,next) => {
//     const token = ctx.header.authorization
//     try{
//         const payload = await verify(token.split(' ')[1], SECRET)
//         ctx.body = {
//             errno: 0,
//             data: payload
//         }
//     }catch(ex){
//         ctx.body = {
//             errno:-1,
//             message:'filed to get data'
//         }
//     }

// })

// 首页
router.get('/',loginRedirect,async (ctx,next) => {
    await ctx.render('index',{})
})
// router.get('/', loginRedirect, async (ctx, next) => {
//     const userInfo = ctx.session.userInfo
//     const { id: userId } = userInfo

//     // 获取第一页数据
//     const result = await getHomeBlogList(userId)
//     const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

//     // 获取粉丝
//     const fansResult = await getFans(userId)
//     const { count: fansCount, fansList } = fansResult.data

//     // 获取关注人列表
//     const followersResult = await getFollowers(userId)
//     const { count: followersCount, followersList } = followersResult.data

//     // 获取 @ 数量
//     const atCountResult = await getAtMeCount(userId)
//     const { count: atCount } = atCountResult.data

//     await ctx.render('index', {
//         userData: {
//             userInfo,
//             fansData: {
//                 count: fansCount,
//                 list: fansList
//             },
//             followersData: {
//                 count: followersCount,
//                 list: followersList
//             },
//             atCount
//         },
//         blogData: {
//             isEmpty,
//             blogList,
//             pageSize,
//             pageIndex,
//             count
//         }
//     })
// })

// 测试 redis
// router.get('/json',loginCheck, async (ctx, next) => {
//     // const session = ctx.session
//     // if(session.viewNum == null){
//     //     session.viewNum =  0
//     // }
//     // session.viewNum ++

//     ctx.body={
//         title:'koa2 json',
//         // session:session.viewNum,
//     }
// })

// 个人主页
// router.get('/profile', loginRedirect, async (ctx, next) => {
//     const { userName } = ctx.session.userInfo
//     ctx.redirect(`/profile/${userName}`)
// })
// router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
//     // 已登录用户的信息
//     const myUserInfo = ctx.session.userInfo
//     const myUserName = myUserInfo.userName

//     let curUserInfo
//     const { userName: curUserName } = ctx.params
//     const isMe = myUserName === curUserName
//     if (isMe) {
//         // 是当前登录用户
//         curUserInfo = myUserInfo
//     } else {
//         // 不是当前登录用户
//         const existResult = await isExist(curUserName)
//         if (existResult.errno !== 0) {
//             // 用户名不存在
//             return
//         }
//         // 用户名存在
//         curUserInfo = existResult.data
//     }

//     // 获取微博第一页数据
//     const result = await getProfileBlogList(curUserName, 0)
//     const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

//     // 获取粉丝
//     const fansResult = await getFans(curUserInfo.id)
//     const { count: fansCount, fansList } = fansResult.data

//     // 获取关注人列表
//     const followersResult = await getFollowers(curUserInfo.id)
//     const { count: followersCount, followersList } = followersResult.data

//     // 我是否关注了此人？
//     const amIFollowed = fansList.some(item => {
//         return item.userName === myUserName
//     })

//     // 获取 @ 数量
//     const atCountResult = await getAtMeCount(myUserInfo.id)
//     const { count: atCount } = atCountResult.data

//     await ctx.render('profile', {
//         blogData: {
//             isEmpty,
//             blogList,
//             pageSize,
//             pageIndex,
//             count
//         },
//         userData: {
//             userInfo: curUserInfo,
//             isMe,
//             fansData: {
//                 count: fansCount,
//                 list: fansList
//             },
//             followersData: {
//                 count: followersCount,
//                 list: followersList
//             },
//             amIFollowed,
//             atCount
//         }
//     })
// })

// // 广场
// router.get('/square', loginRedirect, async (ctx, next) => {
//     // 获取微博数据，第一页
//     const result = await getSquareBlogList(0)
//     const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

//     await ctx.render('square', {
//         blogData: {
//             isEmpty,
//             blogList,
//             pageSize,
//             pageIndex,
//             count
//         }
//     })
// })

// // atMe 路由
// router.get('/at-me', loginRedirect, async (ctx, next) => {
//     const { id: userId } = ctx.session.userInfo

//     // 获取 @ 数量
//     const atCountResult = await getAtMeCount(userId)
//     const { count: atCount } = atCountResult.data

//     // 获取第一页列表
//     const result = await getAtMeBlogList(userId)
//     const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

//     // 渲染页面
//     await ctx.render('atMe', {
//         atCount,
//         blogData: {
//             isEmpty,
//             blogList,
//             pageSize,
//             pageIndex,
//             count
//         }
//     })

//     // 标记为已读
//     if (atCount > 0) {
//         await markAsRead(userId)
//     }
// })

module.exports = router
