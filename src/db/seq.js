const Sequelize = require('sequelize')
const {MYSQL_CONF} = require('../conf/db')
const {isTest,isProd} = require('../utils/env')

const {host,database,username, password} = MYSQL_CONF

// 开发环境
const conf = {
    host,
    dialect: 'mysql'
}

// 测试环境 不打印 seq 语句 
if(isTest){
    conf.logging = () => {}
}

// 线上环境 使用连接池
// if(isProd) {
// conf.pool = {
//     max: 5,
//     min: 0, 
//     idle:10000, // 10s 内没有连接 则被释放 
// }
// }


const seq = new Sequelize(database,user,password,conf)

// 测试链接 
// seq.authenticate().then(() => console.log('ok')).catch((e) => console.log(e))

module.exports = seq