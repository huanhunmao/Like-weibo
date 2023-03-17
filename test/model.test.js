const User = require('../src/db/model/User');

test('User model 是否符合',() => {
    // 会构建一个内存实例 不会提交到数据库
    const user = User.build({
        userName:'zhangsan',
        password:'123',
        nickName:'张三',
        picture:'xxx.png',
        city:'广州'
    })

    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('123')
    expect(user.nickName).toBe('张三')
    expect(user.picture).toBe('xxx.png')
    expect(user.city).toBe('广州')
})