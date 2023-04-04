const {AtRelation,Blog,User}  = require('../db/model/index')
const { formatBlog, formatUserPicture } = require('./_format')

async function createAtRelation(blogId, userId){
    const result = AtRelation.create({
        blogId,
        userId
    })

    return result.dataValues
}

async function getAtMeRelationCount(userId){
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead:false
        }
    })

    return result.count 
    // result.rows 是别的数据 暂时不要

}

async function getAtUserBlogList({userId, pageIndex, pageSize = 0}) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageIndex * pageSize,
        order:[
            ['id','desc']
        ],
        include:[
            {
                model: AtRelation,
                attributes: ['userId','blogId'],
                where:{
                    userId
                }
            },
            {
                model:User,
                attributes: ['userName','nickName','picture']
            }
        ]
    })

    // result.rows
    // result.count
    let blogList = result.rows.map(row => row.dataValues)
    // 格式化 blog + user
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUserPicture(blogItem.user)

        return blogItem
    })

    return {
        count:result.count,
        blogList
    }
}

async function updateAtRelation(
    {newIsRead},
    {userId, isRead}
){
    // 拼接更新 内容 
    const updateData = {}
    if(newIsRead){
        updateData.isRead = newIsRead
    }

    // 拼接查询 条件 
    const whereData = {}
    if(userId){
        whereData.userId = userId
    }
    if(isRead){
        whereData.isRead = isRead
    }

    // 执行查询 
    const res = await AtRelation.update(updateData,{
        where:whereData
    })

    return res[0] > 0

}


module.exports = {
    createAtRelation,
    getAtMeRelationCount,
    getAtUserBlogList,
    updateAtRelation
}