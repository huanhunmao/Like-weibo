/**
 * @description 微博 view 路由
 * @author mark老师
 */
const jwtToken = require('jsonwebtoken')
const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog.profile')
const { isExist } = require('../../controller/user')

// 首页
router.get('/',loginRedirect,async (ctx,next) => {
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    // 获取第一页数据
    const result = await getProfileBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    await ctx.render('index', {
        userData: {
            userInfo,
        },
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })

})

// 个人主页 
// 如果 直接访问 /profile 则展示 自己的个人主页即可 
router.get('/profile',async (ctx,next) => {
    const {userName} = ctx.session.userInfo
    ctx.redirect(`/profile/${userName}`)
})
router.get('/profile/:userName', loginRedirect, async (ctx,next) => {
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo
    const { userName:curUserName } = ctx.params
    const isMe = myUserName === curUserName

    if (isMe) {
        // 是当前登录用户
        curUserInfo = myUserInfo
    } else {
        // 不是当前登录用户
        const existResult = await isExist(curUserName)
        if (existResult.errno !== 0) {
            // 用户名不存在
            return
        }
        // 用户名存在
        curUserInfo = existResult.data
    }


    const result = await getProfileBlogList(
        curUserName,
        0
    )
    const {isEmpty, blogList, pageSize, pageIndex, count} = result.data

    await ctx.render('profile',{
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData:{
            userInfo:curUserInfo,
            isMe
        }
    })
})

module.exports = router
