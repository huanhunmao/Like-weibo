/**
 * @description 微博缓存层
 * @author mark老师
 */

const { getBlogListByUser } = require('../services/blog')
const { get, set } = require('./_redis')
const REDIS_KEY = 'weibo:square'

async function getSquareCacheList({pageSize,pageIndex}){
    const key = `${REDIS_KEY}${pageIndex}${pageSize}`

    // 尝试读取缓存 
    const cacheRes = await get(key)
    if(cacheRes !== null){
        return cacheRes
    }

    // 读不到 去数据库查找
    const res = await getBlogListByUser({pageSize,pageIndex})
    
    // 设置缓存  过期时间 60 s
    set(key, res, 60 )

    return res
}

module.exports = {
    getSquareCacheList
}