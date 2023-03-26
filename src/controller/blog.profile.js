const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')
const { getBlogListByUser } = require('../services/blog')

async function getProfileBlogList (userName, pageIndex = 0){
    // services
    const res = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: PAGE_SIZE,
    })

    const blogList = res.blogList

    // 拼接返回数据 
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize:PAGE_SIZE,
        pageIndex,
        count: res.count
    })
}

module.exports = {
    getProfileBlogList
}