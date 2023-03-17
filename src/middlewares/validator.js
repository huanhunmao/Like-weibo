/**
 * @description json schema 验证中间件
 * @author mark老师
 */

const { jsonSchemaFileInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

/**
 * 生成json schema 验证的 中间件
 * @param {function} validatorFn 传入验证函数
*/

function genValidator(validateFn) {
    // 定义中间件函数
    async function validator(ctx, next) {
        const data = ctx.request.body
        const error = validateFn(data)
        if (error) {
            // 验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo)
            return
        }
        // 验证成功，继续
        await next()
    }
    // 返回中间件
    return validator
}

module.exports = {
    genValidator
}