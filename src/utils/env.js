/**
 * @description 环境变量
 * @author mark老师
 */

const ENV = process.env.NODE_ENV // 获取 package 里的 env 

module.exports = {
    isDev: ENV === 'dev',
    notDev: ENV !== 'dev',
    isProd: ENV === 'production',
    notProd: ENV !== 'production',
    isTest: ENV === 'test',
    notTest: ENV !== 'test'
}
