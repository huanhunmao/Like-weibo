/**
 * @description user 数据格式校验
 * @author mark老师
 */

const {validate} = require('./_validate')

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string',
        },
        image: {
            type: 'string',
            maxLength: 255,
        },
    }
}

/**
 * 校验用户数据
*/

function validateUser(data = {}) {
    return validate(SCHEMA, data)
}

module.exports = validateUser