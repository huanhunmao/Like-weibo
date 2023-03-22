
/**
 * @description user service
 * @author fhj
*/

const {User} = require('../db/model/index')
const { formatUserPicture } = require('./_format')

/**
 * @param {string} userName
 * @param {string} password
*/
async function getUserInfo(userName, password){
    let whereOpt = {
        userName
    }

    if(password){
        Object.assign(whereOpt,{password})
    }

    // 查询 
    const result = await User.findOne({
        // 查到这些值
        attributes: ['id','userName','nickName','city','picture',],
        where:whereOpt
    })

    // 未找到
    if(!result){
        return result
    }

    // 格式化 
    const formatRes =  formatUserPicture(result.dataValues)

    return formatRes
}

async function createUser({userName, password,gender = 3, nickName}){
    const result = await User.create({
        userName,
        password,
        gender,
        nickName: nickName ? nickName : userName
    })
    console.log('result',result)

    return result.dataValues
}

async function deleteUser(userName){
    const result = await User.destroy({
        where:{userName}
    })

    return result > 0
}

// 更新
async function updateUserInfo(
    {newNickName, newPassword,newPicture,newCity},
    {userName,password}
){
    // 拼接修改条件 
    let updateData = {}
    if(newNickName){
        updateData.userName = newNickName
    }
    if(newPassword){
        updateData.password = newPassword
    }
    if(newPicture){
        updateData.picture = newPicture
    }
    if(newCity){
        updateData.city = newCity
    }

    // 拼接查询条件
    let whereData = {
        userName
    }

    if(password){
        whereData.password = password
    }

    // 执行修改 
    const result = await User.update(updateData,{
        where: whereData
    })

    return result[0] > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUserInfo
}