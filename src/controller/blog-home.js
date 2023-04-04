const { PAGE_SIZE, REG_FOR_AT_WHO } = require('../conf/constant')
const xss = require('xss')
const { createBlogFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { createBlog, getFollowBlogList } = require('../services/blog')
const  { createAtRelation } = require('../services/atRelation')
const  { getUserInfo } = require('../services/user')

async function create({content, image,userId}) {
    // 分析 并收集 content 里的数据 
    // content 格式 @张三-zhangsan
    const atUserNameList = []
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            atUserNameList.push(userName)
            // 目的不是替换 而是得到 userName
            return matchStr 
        }
    )

    // 根据 @ 用户 查询 用户信息 
    const atUserList = await Promise.all(
        atUserNameList.map(userName => getUserInfo(userName))
    )

    // 根据用户信息 查询 用户 id
    const atUserIdList = atUserList.map(user => user.id)


    // services
    try{
        const blog = await createBlog({
            userId,
            content:xss(content),
            image
        })

        // 创建 @ 关系 
        // blog.id 
        // services
        await Promise.all(
            atUserIdList.map(id => createAtRelation(blog.id, id))
        )
        return new SuccessModel(blog)
    }catch(err){
        console.log(err.message, err.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

// 获取首页 微博 列表 
async function getHomeBlogList(userId, pageIndex = 0){
    // services
    const {count,blogList} =  await getFollowBlogList({userId,pageIndex,pageSize:PAGE_SIZE})

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = {
    create,
    getHomeBlogList
}