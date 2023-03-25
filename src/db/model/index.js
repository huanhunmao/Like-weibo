/*
 * @description 数据模型入口文件
 * @author mark老师
 */

const User = require('./User')
const Blog = require('./Blog')

// 建立外键 关联  一个用户可以有多个微博
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog,
}
