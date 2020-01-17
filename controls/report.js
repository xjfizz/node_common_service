const $sql = require("../sql/sqlMap");
const $http = require("../sql/http");
const $time = require("../utils/time");
const $dataHandle = require("../utils/dataHandle");
const uuid = require("node-uuid");
let i = 0;

function formatData(rows) {
  return rows.map(row => {
    if (row.create_time) {
      row.create_time = $time.formatTime(row.create_time);
    }
    if (row.update_time) {
      row.update_time = $time.formatTime(row.update_time);
    }
    if (row.start_time) {
      row.start_time = $time.formatYmd(row.start_time);
    }
    if (row.end_time) {
      row.end_time = $time.formatYmd(row.end_time);
    }
    return Object.assign({}, row);
  });
}

const report = {
  /* 根据用户Id获取日报-start */
  reportList(req,res) {
    let params = req.query
    $http.userVerify(req,res, ()=>{
      let sql = $sql.report.reportList
      let {userId, type = '1'} = params
      let paramsArray = [userId, type]
      $http.connPool(sql,paramsArray, (err,result)=> {
        if(err) return $http.writeJson(err,{code: 206, message: '操作失败'})
        let resultData = formatData(result)
        return $http.writeJson(res,{code: 200, message: '操作成功', data: resultData })
      })
    })
  }
  /* 根据用户Id获取日报-end */
};

module.exports = report;
