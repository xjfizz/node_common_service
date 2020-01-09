const $sql = require('../sql/sqlMap')
const $http = require('../sql/http')
const $time = require('../utils/time')


function formatData(rows) {
  return rows.map(row => {
    if(row.create_time) {
      row.create_time = $time.formatTime(row.create_time)
    }
    if(row.update_time) {
      row.update_time = $time.formatTime(row.update_time)
    }
    if(row.startTime) {
      row.startTime = $time.formatYmd(row.startTime)
    }
    if(row.endTime) {
      row.endTime = $time.formatYmd(row.endTime)
    }
    return Object.assign({}, row)
  })
}

const company = {


  /*获取周报信息 start*/
  lunboList (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      console.log(params, params.state)
      let state = params.state
     // let id = params.id
      if(!state || state == 0) {
        console.log('==================')
       // $http.writeJson(res, {code: 202, message:'参数有误'})
       let sql = $sql.company.lunboImgAll
       let arrayParams = []
       sql += " order by create_time desc"; // id倒序排
       $http.connPool(sql, arrayParams, (err, result) => {
         console.log(result)
         if(err) {
           return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})
         } else {
           let resultData = {}
           resultData.page = {
             total: result.length
           }
            resultData.list = formatData(result)
           // resultData.list = result
           return $http.writeJson(res, {code: 200, data: resultData, message: '获取商品图片成功'})
         }
       })
      }
      else {
        let sql = $sql.company.lunboImg
        let arrayParams = [state]
        sql += " order by create_time desc"; // id倒序排
        $http.connPool(sql, arrayParams, (err, result) => {
          console.log(result)
          if(err) {
            return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})
          } else {
            let resultData = {}
            resultData.page = {
              total: result.length
            }
             resultData.list = formatData(result)
            // resultData.list = result
            return $http.writeJson(res, {code: 200, data: resultData, message: '获取商品图片成功'})
          }
        })
      }
    })
  },
  /*获取周报信息 end*/


   /*获取联系我们列表 start*/
   contactList (req, res) {
    let params = req.body
    $http.userVerify(req, res, () => {
      let sql = $sql.company.contactList
      let arrayParams = []
      sql += " order by create_time desc"; // id倒序排
      $http.connPool(sql, arrayParams, (err, result) => {
        console.log(result)
        if(err) {
          return $http.writeJson(res, {code:-2, message:'失败',errMsg: err})
        } else {
          let resultData = {}
          resultData.page = {
            total: result.length
          }
           resultData.list = formatData(result)
          // resultData.list = result
          return $http.writeJson(res, {code: 200, data: resultData, message: '操作成功'})
        }
      })
    })
  },
  /*获取周报信息 end*/



}

module.exports = company
