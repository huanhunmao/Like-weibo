/**
 * @description 首页 API 路由
 * @author mark老师
 */

const { create } = require('../../controller/blog-home')
const { loginCheck } = require('../../middlewares/loginChecks')
const router = require('koa-router')()

router.prefix('/api/blog')

// 创建微博 
router.post('/create', loginCheck, async (ctx, next) => {
    const { content, image } = ctx.request.body
    const { id: userId } = ctx.session.userInfo
    ctx.body = await create({ userId, content, image })
})

module.exports = router
