
/**
 * @description 数据格式化
 * @author mark老师
 */
const {DEFAULT_PICTURE, REG_FOR_AT_WHO} = require('../conf/constant')
const { timeFormat } = require('../utils/dt')
function _formatUserDefaultPicture(pic){
    if(pic.picture == null){
        pic.picture = DEFAULT_PICTURE // 默认头像
    }
    return pic
}

/**
 *  用户信息格式化
 * @param {Array | Object} list
*/
function formatUserPicture(list){
    if(list == null ){
        return list
    }

    // 是数组
    if(list instanceof Array){
        return list.map(_formatUserDefaultPicture)
    }

    return _formatUserDefaultPicture(list)
}

/**
 * 格式化微博内容
 * @param {Object} obj 微博数据对象
 */
function _formatContent(obj) {

    // 格式化 @
    // from '哈喽 @张三 - zhangsan 你好'
    // to '哈喽 <a href="/profile/zhangsan">张三</a> 你好'
    obj.objForm = obj.content.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href="/profile/${userName}">@${nickName}</a>`
        }
    )

    return obj
}
/**
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime(obj) {
    obj.createdAtFormat = timeFormat(obj.createdAt)
    obj.updatedAtFormat = timeFormat(obj.updatedAt)
    return obj
}

/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
function formatBlog(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        // 数组
        return list.map(_formatDBTime).map(_formatContent)
    }
    // 对象
    let result = list
    result = _formatDBTime(result)
    result = _formatContent(result)
    return result
}

module.exports = {
    formatUserPicture,
    formatBlog
}