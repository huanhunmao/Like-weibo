/**
 * @description 微博数据相关的工具方法
 * @author mark老师
 */

const fs = require('fs')
const path = require('path')
const ejs = require('ejs')

// 获取 blog-list.ejs 内容 方便 
const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname, '..', 'views','widgets','blog-list.ejs')
).toString()

// 使用 ejs 直接后端渲染
function getBlogListStr(blogList = [] , canReply = false){
    return ejs.render(BLOG_LIST_TPL, {
        blogList,
        canReply
    })
}

module.exports = getBlogListStr