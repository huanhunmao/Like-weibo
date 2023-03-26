/**
 * @description 微博 service
 * @author mark老师
 */
const  { Blog, User } = require('../db/model/index')
const { formatUserPicture } = require('./_format')

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

module.exports = {
    createBlog,
    getBlogListByUser
}
