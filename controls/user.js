const $sql = require('../sql/sqlMap')
const moment = require('moment')
const $http = require('../sql/http')
const $time = require('../utils/time')
const jwt = require('jwt-simple')
const express = require('express')
const app = express()
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING')

// 数据处理
function formatData(rows) {
  return rows.map(row => {
    if(row.create_time) {
      row.create_time = $time.formatTime(row.create_time)
    }
    if(row.update_time) {
      row.update_time = $time.formatTime(row.update_time)
    }
    let type = row.type
    if(type) {
      switch(type) {
        case 1:
          row.role = '管理员'
          break;
        case 2:
          row.role = '普通用户'
          break;
      }
    }
    return Object.assign({}, row)
  })
}

const user = {

  /*  用户登录-start */
  login(req, res) {
    console.log("==login===")
    let params = req.body
    let { username, password } = params
    let sql = $sql.user.login
    let arrayParams = [username, password]
    $http.connPool(sql,arrayParams, (err, result) => {
      // return $http.writeJson(res,{result: result, err:err})
      if(err) {
        return $http.writeJson(res, {code: 406, message: '失败', errMsg: err})
      } else if (!result.length) {
        return $http.writeJson(res, {code:204, message: '用户名或密码不正确'})
      } else{

        /*  过滤被禁用的账户 */
        if(result[0].state == 2) {
          let resultData = {}
          resultData.code = 205
          resultData.data = null
          resultData.message = '此账户已被禁用,请联系管理员'
          return $http.writeJson(res, resultData)
        } else {
          let resultData = {}
          resultData.code = 200
          let data = result[0]
         // data = formatData(data)
         data.create_time = $time.formatTime(data.create_time)
         if(data.type > 1) data.role = '普通用户'
         data.role = '管理员'
         delete data.password

         /*  设置移动端登录连续320分钟过期 */
          let expires = moment().add(30, 'm').valueOf()
          let token = jwt.encode({
            iss: data.id,
            exp: expires
          }, app.get('jwtTokenSecret'))
          data.token = token
          resultData.data = data
          resultData.message = '登录成功'
          return $http.writeJson(res, resultData)

        }
      }
    })
  },
  /* 用户登录-end */

  /* 添加用户 */

  add(req,res) {
    let params = req.body
    $http.userVerify(req,res, () => {
      let curTime = $time.formatTime()
      let {username, nickname, phone, password, state, type,  } = params
      let create_time = curTime
      let update_time = curTime
      if(!username || !password) $http.writeJson(res,{code: 206, message: '参数有误'})
      else {
        let sql = $sql.user.add
        // let arrayParams = [username, nickname, phone, password, state, type, create_time, update_time ]
        let arrayParams = [username, nickname, password, phone, create_time, update_time, state, type]
        $http.connPool(sql, arrayParams, (err, result) => {
          if(err) return $http.writeJson(res, {code:206,message: '失败', errMsg: err})
          if(result.affectedRows != 1) return $http.writeJson(res, {code: 206, message: '添加失败，用户名重复'})
          return $http.writeJson(res,{code: 200, message: '添加成功'})
        })
      }
    })
  },

 /* 用户列表 */
  list(req,res) {
    console.log("==user/list===")
    let params = req.body
    $http.userVerify(req,res, () => {
     let sqlSelectTotal = $sql.user.getListTotal
     let sqlSelectList = $sql.user.getList
     let pageNum = !params.pageNum ? 1 : params.pageSize
     let pageSize = !params.pageSize ? 10 : params.pageSize
     if(pageNum <= 0 || pageSize <= 0) {
       return $http.writeJson(res, {code: 206, message: '分页参数不正确'})
     } else{
       // 分页查询入参-start
      let limitFirst = (pageNum - 1) * pageSize;
      let limitLast = pageSize;
      // 分页查询入参-end

      // 执行sql-
      let sql = sqlSelectTotal +  ';' + sqlSelectList
      sql += " order by create_time desc limit ?,?"

      let arrayParams = [limitFirst, limitLast];

      $http.connPool(sql, arrayParams, (err,result) => {
        if(err) {
          return $http.writeJson(res, {code: 206, message: '失败'})
        } else {
           let resultData = {}
           resultData.totalCount = result[0][0]['totalCount']
           resultData.list = formatData(result[1])
           return $http.writeJson(res,{code: 200, data: resultData, message: '获取用户列表成功'})
        }
      })
     }
    })
  }
}

module.exports = user