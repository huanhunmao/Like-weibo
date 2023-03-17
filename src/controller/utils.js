/**
 * @description utils controller
 * @author mark老师
 */

const path = require('path')
const { ErrorModel, SuccessModel } = require('../model/ResModel')
const { uploadFileSizeFailInfo } = require('../model/ErrorInfo')
const fse = require('fs-extra')

// 文件最大体积 1M
const MIX_SIZE = 1024 * 1024 * 1024

const DIST_FOLDER_PATH = path.join(__dirname, '..','..','uploadFiles')

// 判断是否需要创建 uploadFile 文件夹
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if(!exist) {
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})

/**
 * 保存文件
 * @param {string} name 文件名 
 * @param {string} type 文件类型 
 * @param {number} size 文件体积大小 
 * @param {string} filePath 文件路径 
 */
async function saveFile({ name, type, size, filePath }) {
    if(size > MIX_SIZE){
        await fse.remove(filePath) // 删除文件
        return new ErrorModel(uploadFileSizeFailInfo)
    }

    // 移动文件到指定目录
    const fileName = Date.now() + '.' + name 
    const distFilePath = path.join(DIST_FOLDER_PATH,fileName)
    await fse.move(filePath,distFilePath)

    // 返回信息 url 
    return new SuccessModel({
        url:'/' + fileName,
    })
}

module.exports = {
    saveFile
}
