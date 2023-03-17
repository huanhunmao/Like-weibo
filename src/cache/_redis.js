/**
 * @description 连接 redis 的方法 get set
 * @author mark老师
 */

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db')

// 创建客户端
const redisClient =  redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error('redis error')
})

/**
 * set
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout 过期时间 s
 */
function set(key,val,timeout = 60 * 60) {
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }

    redisClient.set(key,val)
    redisClient.expire(key,timeout)
}


/** 
 * get
 * @param {string} key
*/
function get(key){
    const promise = new Promise((resolve,reject) => {
        redisClient.get(key, (err, result) => {
            if(err) return reject(err)
            if(result == null) return resolve(null)

            try{
                resolve(
                    JSON.parse(result)
                )
            }catch(err){
                resolve(result) 
            }
        })
    })

    return promise
}


module.exports = {
    set,
    get
}