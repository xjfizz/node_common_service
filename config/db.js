// 数据库连接配置
module.exports = {
  host: 'localhost',
  user: 'root', // 数据库账户
  password: '123456', // 数据库密码
  database: 'node_commonservice', // 数据库名称
  port: 3306, // 端口号
  multipleStatements: true // 是否允许在一个query 中传递多个查询语句
}