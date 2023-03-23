const servers = require('./server')

// 定义用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender:1
}

// 存储一个 cookie 测试登陆时候用
let COOKIE = ''

// 注册
test('第一次注册成功', async () => {
    const res = await servers
    .post('/api/user/register')
    .send(testUser)

    expect(res.body.errno).toBe(0)
})

// // 重复注册失败
test('重复注册失败', async() => {
    const res = await servers
    .post('/api/user/register')
    .send(testUser)

    expect(res.body.errno).not.toBe(0)
})

// 查询注册过的用户 应该存在 
test('查询注册过的用户', async() => {
    const res = await servers
    .post('/api/user/isExist')
    .send({userName})

    expect(res.body.errno).toBe(0)
})

// json schema 不合法 
test('json schema', async() => {
    const res = await servers
    .post('/api/user/register')
    .send({
        userName: '123',
        password:'a',
        gender: 'male',
    })

    expect(res.body.errno).not.toBe(0)
})

// 登陆成功
test('登陆成功', async() => {
    const res = await servers
    .post('/api/user/login')
    .send({userName, password})

    expect(res.body.errno).toBe(0)

    // 获取 cookie
    COOKIE = res.headers['set-cookie'].join(';')
})

// 修改基本信息 
// test('修改基本信息成功', async() => {
//     const res = await servers
//     .patch('/api/user/changeInfo')
//     .send({
//         nickName: '测试name',
//         city:'测试城市',
//         picture:'/test.png'

//     })
//     .set('cookie',COOKIE)

//     expect(res.body.errno).toBe(0)
// })

// 修改密码
// test('修改密码成功', async() => {
//     const res = await servers
//     .patch('/api/user/changePassword')
//     .send({
//         password,
//         newPassword: 'p_ejqwiewqiej1919'
//     })
//     .set('cookie',COOKIE)

//     expect(res.body.errno).toBe(0)
// })

// 删除用户成功
test('删除用户成功', async() => {
    const res = await servers
    .patch('/api/user/delete')
    .set('cookie',COOKIE)

    expect(res.body.errno).toBe(0)
})

// 退出登陆
// test('退出登陆成功', async() => {
//     const res = await servers
//     .post('/api/user/logout')
//     .set('cookie',COOKIE)

//     expect(res.body.errno).toBe(0)
// })

// 再次找不到 
test('查询注册过的用户', async() => {
    const res = await servers
    .post('/api/user/isExist')
    .send({userName})

    expect(res.body.errno).not.toBe(0)
})