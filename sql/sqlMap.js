const sqlMap = {

  // 用户
  user: {
    // 登录
    login: 'select * from user where username = ? and password = ? and state != 0',
    // 新增用户
    add: 'insert ignore into user (username, nickname, password, phone, create_time, update_time, state, type) values (?, ?, ?, ?, ?, ?, ?, ?)',
    // 更新用户信息
    updateInfo: 'update user set username = ?, nickname = ?, password = ?, phone = ?, update_time = ?, state = ? type = ? where id = ? and state != 0',
    // 更新用户转态
    updateState: 'update user set state = ?, update_time = ?  where id = ? and state != 0',
    // 获取用户信息
    getDetail: 'select * from user where id = ? and state != 0',
    // 获取用户列表
    getList: 'select * from user where state != 0',
    // 获取列表条数
    getListTotal: 'select count(*) as totalCount from user where state != 0'
  },

    // 公司官网
    company: {
      lunboImg: 'SELECT * FROM home_lunbo WHERE state = ?', // 根据公司获取首页轮播图列表
      lunboImgAll: 'SELECT * FROM home_lunbo',  // 获取首页轮播图列表-总
      contactList: 'select * from contact', // 获取联系我们列表
    }
}
module.exports = sqlMap