/**
 * @description 微博 view 路由
 * @author mark老师
 */
const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')
const { getProfileBlogList } = require('../../controller/blog.profile')
const { isExist } = require('../../controller/user')
const { getSquareBlogList } = require('../../controller/blog-square')
const { getFans,getFollowers } = require('../../controller/user-relation')
const { getHomeBlogList } = require('../../controller/blog-home')
const { getAtMeCount, getAtMeBlogList, markAsRead } = require('../../controller/blog-at')

// 首页
router.get('/',loginRedirect,async (ctx,next) => {
    const userInfo = ctx.session.userInfo
    const { id: userId } = userInfo

    // 获取第一页数据
    const result = await getHomeBlogList(userId)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data

    // 获取粉丝数 
    // controller
    const res = await getFans(userId)
    const {count:fansCount, userList:fansList} = res.data

    // 获取关注人列表
    const followersResult = await getFollowers(userId)
    const { count: followersCount, followerList } = followersResult.data

    // 获取 @ 数量 
    const temp = await getAtMeCount(userId)
    const {count:atCount} = temp.data

    await ctx.render('index', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData:{
            userInfo,
            fansData:{
                count:fansCount,
                list:fansList
            },
            followersData: {
                count: followersCount,
                list: followerList
            },
            atCount
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

    // 获取粉丝数 
    // controller
    const res = await getFans(curUserInfo.id)
    const {count:fansCount, userList:fansList} = res.data

    // 获取关注人列表
    const followersResult = await getFollowers(curUserInfo.id)
    const { count: followersCount, followerList } = followersResult.data

    // 我是不是 这个人粉丝 
    const amIFollowed = fansList.some((fans) => fans.userName === myUserName )

    // 获取 @ 数量 
    const temp = await getAtMeCount(myUserInfo.id)
    const {count:atCount} = temp.data

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
            isMe,
            fansData:{
                count:fansCount,
                list:fansList
            },
            followersData: {
                count: followersCount,
                list: followerList
            },
            amIFollowed,
            atCount
        }
    })
})

// 广场 
router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取微博第一页数据 
    const res = await getSquareBlogList(0)
    const {isEmpty, blogList, pageSize, pageIndex,count } = res.data

    await ctx.render('square',{
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
    })
})

// 提到我的 
router.get('/at-me', loginRedirect, async (ctx, next) => {
    const myUserInfo = ctx.session.userInfo
    const userId = myUserInfo.id
    // controller

    // 展示第一页数据 
    const res = await getAtMeBlogList(userId)
    const {isEmpty, blogList, pageSize,pageIndex,count} = res.data

    // 展示 @ 数量 
    const temp = await getAtMeCount(userId)
    const {count:atCount} = temp.data

    await ctx.render('atMe',{
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        atCount
    })

    // 标记为 已读 
    if(atCount > 0){
        // controller
        await markAsRead(userId)
    }
})

module.exports = router
