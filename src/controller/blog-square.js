const { getSquareCacheList } = require('../cache/blog')
const { PAGE_SIZE } = require('../conf/constant')
const { SuccessModel } = require('../model/ResModel')

async function  getSquareBlogList(pageIndex = 0){
    // cache
    const res = await getSquareCacheList({pageIndex,pageSize:PAGE_SIZE})

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
    getSquareBlogList
}