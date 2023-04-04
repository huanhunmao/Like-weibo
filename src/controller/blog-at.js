const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getAtMeRelationCount, getAtUserBlogList, updateAtRelation } = require('../services/atRelation')

async function getAtMeCount(userId){
    //services
    const count = await getAtMeRelationCount(userId)
    
    return new SuccessModel({count})
}

async function getAtMeBlogList(userId, pageIndex = 0){
    // services
    const {count, blogList} = await getAtUserBlogList({userId, pageIndex, pageSize:PAGE_SIZE})

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count
    })
}

async function markAsRead(userId){
    // services
    try{
        await updateAtRelation({newIsRead: true}, {
            userId,
            isRead: false
        })
    }catch(ex){
        console.error(ex)
    }
}

module.exports = {
    getAtMeCount,
    getAtMeBlogList,
    markAsRead
}