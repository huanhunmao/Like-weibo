

const { getAtMeBlogList } = require('../../controller/blog-at')
const { loginCheck } = require('../../middlewares/loginChecks')
const getBlogListStr = require('../../utils/blog')
const router = require('koa-router')()

router.prefix('/api/atMe')

// 加载更多 
router.get('/loadMore/:pageIndex', loginCheck, async(ctx, next) => {
    let { pageIndex} = ctx.params
    const {id:userId} = ctx.session.userInfo
    pageIndex = parseInt(pageIndex)

    const res = await getAtMeBlogList(userId, pageIndex)

    res.data.blogListTpl = getBlogListStr(res.data.blogList)

    ctx.body = res
})

module.exports = router
