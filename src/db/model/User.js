/**
 * @description user 数据建模
 * @author fhj
*/

const seq = require('../seq')
const {STRING,DECIMAL} = require('../types')

const User = seq.define('user',{
    userName:{
        type:STRING,
        allowNull:false,
        unique:true, // 唯一的
        comment:'用户名'
    },
    password:{
        type:STRING,
        allowNull:false,
        comment:'密码'
    },
    nickName:{
        type:STRING,
        allowNull:false,
        comment:'昵称'
    },
    gender:{
        type:DECIMAL, // 更小 0-9
        allowNull:false,
        defaultValue:3, // 1 男 2 女 3 保密
        comment:'性别',
    },
    picture:{
        type:STRING,
        comment:'头像'
    },
    city:{
        type:STRING,
        comment:'城市'
    }
})

module.exports = User