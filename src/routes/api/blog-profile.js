const { getProfileBlogList } = require('../../controller/blog.profile')
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

module.exports = router