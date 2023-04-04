const { getProfileBlogList } = require('../../controller/blog.profile')
const { follower,unFollow } = require('../../controller/user-relation')
const { loginCheck } = require('../../middlewares/loginChecks')
const getBlogListStr = require('../../utils/blog')
const router = require('koa-router')()

router.prefix('/api/profile')

// 加载更多 
router.get('/loadMore/:userName/:pageIndex', loginCheck, async(ctx, next) => {
    let {userName, pageIndex} = ctx.params
    pageIndex = parseInt(pageIndex)

    const res = await getProfileBlogList(userName, pageIndex)

    res.data.blogListTpl = getBlogListStr(res.data.blogList)

    ctx.body = res
})

// 关注 
router.post('/follow', loginCheck, async(ctx, next) => {
    // controller
    const {id:myUserId} = ctx.session.userInfo // 当前用户 id 
    const {userId:curUserId} = ctx.request.body // 关注用户 id 
    ctx.body = await follower(myUserId,curUserId)
})

// 取消关注 
router.post('/unFollow', loginCheck, async(ctx, next) => {
    // controller
    const {id:myUserId} = ctx.session.userInfo // 当前用户 id 
    const {userId:curUserId} = ctx.request.body // 关注用户 id 
    ctx.body = await unFollow(myUserId,curUserId)
})

module.exports = router