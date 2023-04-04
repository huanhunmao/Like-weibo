const { addFollowerFailInfo, deleteFollowerFailInfo } = require('../model/ErrorInfo')
const { SuccessModel,ErrorModel } = require('../model/ResModel')
const { getUsersByFollower,getFollowerByUser, addFollower,deleteFollower } = require('../services/user-relation')

async function getFans(userId){
    // service
    const res = await getUsersByFollower(userId)
    const {count, userList} = res
    
    return new SuccessModel({
        count,
        userList
    })
}

/**
 * 获取关注人列表
 * @param {number} userId userId
 */
async function getFollowers(userId) {
    const {count, userList:followerList} = await getFollowerByUser(userId)

    return new SuccessModel({
        count, 
        followerList
    })
}

async function follower(myUserId, curUserId){
    // service
    try{
        await addFollower(myUserId, curUserId)
        return new SuccessModel()
    }catch(ex){
        console.error(ex)
        return new ErrorModel(addFollowerFailInfo)
    }
}

async function unFollow(myUserId, curUserId){
    try{
        await deleteFollower(myUserId, curUserId)
        return new SuccessModel()
    }catch(ex){
        console.error(ex)
        return new ErrorModel(deleteFollowerFailInfo)
    }
}

module.exports = {
    getFans,
    follower,
    getFollowers,
    unFollow
}