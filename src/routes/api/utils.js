/**
 * @description utils api 路由
 * @author mark老师
 */

const koaForm = require('formidable-upload-koa')
const router = require('koa-router')()
const { loginCheck } = require('../../middlewares/loginChecks')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

router.post('/upload',loginCheck,koaForm(), async(ctx, next) => {
    const file = ctx.req.files['file'] // 取出上传到数据 
    const {size, type, name, path} = file
    // controller
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath:path
    })
})

module.exports = router