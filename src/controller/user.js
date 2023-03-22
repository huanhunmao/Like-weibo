
/**
 * @description user controller
 * @author mark老师
 */
const { registerUserNameNotExistInfo,registerFailInfo, loginFailInfo, deleteUserFailInfo, changeInfoFailInfo, changePasswordFailInfo } = require('../model/ErrorInfo')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUserInfo, createUser,deleteUser, updateUserInfo } = require('../services/user')
const { cryptoFunc } = require('../utils/cryp')

async function isExist(userName){
    const userInfo = await getUserInfo(userName)

    if(userInfo){
        // 已存在
        // {errno:0,data:userInfo}
        return new SuccessModel(userInfo)
    }else{
        // 不存在
        // {errno:10003,message:xxxx}
        return new ErrorModel(registerUserNameNotExistInfo)
    }
    // 业务逻辑处理 （无）
    // 调用service 获取数据 
    // 统一 处理返回样式 

}

async function register({userName, password,gender}){
    const userInfo = await getUserInfo(userName)

    if(userInfo){
        return new ErrorModel(registerUserNameExistInfo)
    }

    // 注册 services
    try{
        await createUser({userName, password:cryptoFunc(password),gender})
        return new SuccessModel()
    }catch(err){
        console.error(err.message, err.stack)
        return new ErrorModel(registerFailInfo)
    }
}

async function login(ctx,userName, password){
    // 尝试获取用户信息 
    const userInfo = await getUserInfo(userName,cryptoFunc(password))

    if(!userInfo){
        // 登陆失败
        return new ErrorModel(loginFailInfo)
    }

    if(ctx.session.userInfo == null){
        ctx.session.userInfo = userInfo
    }

    return new SuccessModel()
}

async function deleteCurrentUser(userName){
    // service
    const res = await deleteUser(userName)

    if(res){
        return new SuccessModel()
    }

    return new ErrorModel(deleteUserFailInfo)
}

async function changeUserInfo(ctx, {nickName, city,picture}){
    const {userName} = ctx.session.userInfo

    if(!nickName){
        nickName = userName
    }
    // service
    const res = await updateUserInfo(
        {
            newCity:city,
            newPicture:picture,
            newNickName:nickName
        },
        {userName}
    )

    // 服务修改成功
    if(res){
        Object.assign(ctx.session.userInfo,{
            nickName,
            city,
            picture
        })

        return new SuccessModel()
    }

    // 失败 
    return new ErrorModel(changeInfoFailInfo)

}

async function changePassword(userName, password, newPassword){
    const res = await updateUserInfo(
        {newPassword:cryptoFunc(newPassword)},
        {userName,password:cryptoFunc(password)}
    )

    if(res){
        return new SuccessModel()
    }

    return new ErrorModel(changePasswordFailInfo)
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurrentUser,
    changeUserInfo,
    changePassword,
}