/**
 * @description json schema 校验
 * @author mark老师
 */
const AJV = require('ajv')
const ajv = new AJV()

function validate(schema, data = {}){
    const valid =  ajv.validate(schema,data)
    if(!valid) {
        return ajv.errors[0]
    }
}

module.exports = {validate}