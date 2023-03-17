/**
 * @description 加密方法
 * @author mark老师
 */

const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')


/**
 * md5 加密 
*/
function _md5(content){
    // content 是 明文 
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex') // 16 位
}

/**
 * 加密方法 
*/
function cryptoFunc(content){
    const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
    return _md5(str)
}

module.exports = {cryptoFunc}