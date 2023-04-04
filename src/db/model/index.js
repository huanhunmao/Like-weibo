/*
 * @description 数据模型入口文件
 * @author mark老师
 */

const User = require('./User')
const Blog = require('./Blog')
const AtRelation = require('./atRelation')
const UserRelation = require('./UserRelation')

// 建立外键 关联  一个用户可以有多个微博
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
    foreignKey: 'followId'
})

User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

Blog.belongsTo(UserRelation, {  
    foreignKey:'userId',
    targetKey:'followId'
})

Blog.hasMany(AtRelation, {
    foreignKey:  'blogId'
})

module.exports = {
    User,
    Blog,
    UserRelation,
    AtRelation
}
