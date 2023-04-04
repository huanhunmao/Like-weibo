/**
 * @description 首页 API 路由
 * @author mark老师
 */

const { create, getHomeBlogList } = require('../../controller/blog-home')
const { loginCheck } = require('../../middlewares/loginChecks')
const { genValidator } = require('../../middlewares/validator')
const getBlogListStr = require('../../utils/blog')
const router = require('koa-router')()
const  validateBlog  = require('../../validator/blog')

router.prefix('/api/blog')

// 创建微博 
router.post('/create', loginCheck,genValidator(validateBlog), async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({ userId, content, image })
})

// 加载更多 
router.get('/loadMore/:pageIndex', loginCheck, async(ctx, next) => {
    let {userName, pageIndex} = ctx.params
    const {id:userId} = ctx.session.userInfo
    pageIndex = parseInt(pageIndex)

    const res = await getHomeBlogList(userId, pageIndex)

    res.data.blogListTpl = getBlogListStr(res.data.blogList)

    ctx.body = res
})

module.exports = router
