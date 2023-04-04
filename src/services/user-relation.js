const { User, UserRelation } = require('../db/model')
const { formatUserPicture } = require('./_format')
const seq = require('sequelize')

async function getUsersByFollower(followId) {
    const result = await User.findAndCountAll({
        attributes: ['id','userName','nickName','picture'],
        order:[
            ['id', 'desc']
        ],
        // 通过 followId 带出 user 内容
        include:[
            {
                model:UserRelation,
                where:{
                    followId,
                    userId:{
                        [seq.Op.ne]:followId
                    }
                }
            }
        ]
    })

    // result.count 总数 
    // result.rows 查询结果  数组

    // 格式化  加默认图片
    let userList = result.rows.map((row) => row.dataValues)
    userList = formatUserPicture(userList)

    return {
        count:result.count,
        userList
    }
}

// 通过 user 获得 follwerlist
async function getFollowerByUser(userId){
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id', 'userName', 'nickName', 'picture']
            }
        ],
        where: {
            userId,
            followId:{
                [seq.Op.ne]:userId
            }
        }
    })
    // result.count 总数
    // result.rows 查询结果，数组

    let userList = result.rows.map(row => row.dataValues)

    userList = userList.map(item => {
        let user = item.user
        user = user.dataValues
        user = formatUserPicture(user)
        return user
    })

    return {
        count: result.count,
        userList
    }
}

// 我跟随了谁  followId
async function addFollower(userId, followId) {
    const res = await UserRelation.create({
        userId,
        followId
    })

    return res.dataValues
}

async function deleteFollower(userId, followId) {
    const res = await UserRelation.destroy({
        where:{
            userId,
            followId
        }
    })

    return res.dataValues
}

module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower,
    getFollowerByUser
}