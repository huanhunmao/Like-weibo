
/**
 * @description 数据格式化
 * @author mark老师
 */
const {DEFAULT_PICTURE} = require('../conf/constant')

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

module.exports = {
    formatUserPicture
}