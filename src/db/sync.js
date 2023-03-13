const seq = require('./seq')

// require('./model')

// 测试链接 
// seq.authenticate().then(() => console.log('connect ok')).catch((e) => console.log(e))

// 同步 
seq.sync({force: true}).then(
    () =>{console.log('sync ok')
        process.exit()}).catch((e) => console.log(e))