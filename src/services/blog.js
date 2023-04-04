/**
 * @description 微博 service
 * @author mark老师
 */
const  { Blog, User, UserRelation } = require('../db/model/index')
const { formatUserPicture,formatBlog } = require('./_format')

async function createBlog({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

// 查找微博 
async function getBlogListByUser(
    {userName, pageIndex = 0 , pageSize }
){
    // 拼接查询条件 
    const userWhereOpts = {}
    if(userName){
        userWhereOpts.userName = userName
    }

    // 执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 每页多少条
        offset: pageSize * pageIndex, // 跳过多少条
        order: [
            ['id','desc']
        ],
        include: [
            {
                model: User, 
                attribute: ['userName','nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    })

    // result.count 总数，和分页无关  
    // result.rows 查询结果， 数组 

    let blogList = result.rows.map(row => row.dataValues)

    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user =formatUserPicture(user)   // 添加 user 默认头像
        return blogItem
    })

    return {
        count: result.count ,
        blogList ,
    }
}

async function getFollowBlogList({userId, pageIndex, pageSize}){
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id','desc']
        ],
        // 根据blog 可以带出 user 和 userRelation
        include:[
            {
                model:User,
                attributes: ['userName','nickName', 'picture']
            },
            {
                model:UserRelation,
                attributes: ['userId','followId'],
                where:{
                    userId
                }
            }
        ]
    })

    // 获取 dataValues
    let blogList = result.rows.map(row => row.dataValues)

    // 格式化 
    blogList = formatBlog(blogList)

    // 带上 user 内容
    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues
        blogItem.user =formatUserPicture(user)
        return blogItem
    })

    return {
        count: result.count,
        blogList ,
    }
}

module.exports = {
    createBlog,
    getBlogListByUser,
    getFollowBlogList
}
