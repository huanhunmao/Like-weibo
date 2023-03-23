/**
 * @description 微博数据模型
 * @author 
 */

const seq = require('../seq')
const { INTEGER, STRING, TEXT } = require('../types')

const Blog = seq.define('blog',{
    userId:{
        type:INTEGER,
        allowNull: false,
        content: '用户 id'
    },
    content:{
        type:TEXT,
        allowNull: false,
        content: '微博内容'
    },
    picture: {
        type:STRING,
        content:'微博图片'
    }
})

module.exports =  Blog