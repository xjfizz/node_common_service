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
    if (row.startTime) {
      row.startTime = $time.formatYmd(row.startTime);
    }
    if (row.endTime) {
      row.endTime = $time.formatYmd(row.endTime);
    }
    return Object.assign({}, row);
  });
}

const goods = {
  /* 商品列表-start */
  goodsList(req, res) {
    console.log("===goodsList===");
    let params = req.query;
    let sql = $sql.goods.goodsList;
    let id = params.id;
    let paramsArray = [id];
    $http.connPool(sql, paramsArray, (err, result) => {
      if (err)
        return $http.writeJson(res, { code: 206, message: "操作失败", err });
      let resultData = {};
      resultData.list = formatData(result);
      resultData.list = $dataHandle.arrayHandleObj(resultData.list);
      return $http.writeJson(res, {
        code: 200,
        message: "操作成功",
        data: resultData
      });
    });
  },
  /* 商品列表-end */

  /* 商品图片列表-start */
  goodsImgList(req, res) {
    console.log("===goodsImgList===", req);
    let params = req.query;
    console.log("===params===", params);
    let sql = $sql.goods.goodsImgList;
    let id = params.id;
    let paramsArray = [id];
    $http.connPool(sql, paramsArray, (err, result) => {
      console.log("===result===", result);
      // return $http.writeJson(res,{code: 200, message: '操作成功', data: result})
      if (err) return $http.writeJson(res, { code: 206, message: "操作失败" });
      // let resultData = {}
      // resultData.totalCount = result[0][0]['totalCount']
      // resultData.list = formatData(result[1])
      // return $http.writeJson(res,{code: 200, data: resultData, message: '获取用户列表成功'})
      let resultData = {};
      // resultData.pageInfo.total = result[0][0]['totalCount']
      resultData.list = formatData(result);
      return $http.writeJson(res, {
        code: 200,
        message: "操作成功",
        data: resultData
      });
    });
  },
  /* 商品图片列表-end */

  /* 添加商品-start */
  goodsAdd(req, res) {
    let params = req.body;
    let sql = $sql.goods.goodsAdd;
    let { goods_name, goods_message } = params;
    let goods_detail_id = uuid.v1().replace(/-/g, "");
    let create_time = $time.formatTime();
    let paramsArray = [goods_detail_id, goods_name, goods_message, create_time];
    $http.connPool(sql, paramsArray, (err, result) => {
      console.log("===result===", result);
      if (err)
        return $http.writeJson(err, {
          code: 206,
          message: " 操作失败",
          data: null
        });
      console.log("===result===", result);
      if (result.affectedRows > 0)
        return $http.writeJson(res, { code: 200, message: "操作成功" });
    });
  },
  /* 添加图片-end */

  /* 更新商品-start */
  goodsUpdate(req, res) {
    let params = req.body;
    let sql = $sql.goods.goodsUpdate;
    let { id, goods_name, goods_message } = params;
    let goods_detail_id = id; // (uuid.v1()).replace(/-/g, "")
    let update_time = $time.formatTime();
    let paramsArray = [goods_name, goods_message, update_time, goods_detail_id];
    $http.connPool(sql, paramsArray, (err, result) => {
      console.log("===result===", result);
      if (err)
        return $http.writeJson(err, {
          code: 206,
          message: " 操作失败",
          data: null
        });
      console.log("===result===", result);
      if (result.affectedRows > 0)
        return $http.writeJson(res, { code: 200, message: "操作成功" });
    });
  },
  /* 更新商品-end */

  
  /* 删除商品-start */
  goodsDelete(req, res) {
    // if(i == 0) return $http.writeJson(res, { code: "====S=====B====", message: "别点了，傻逼，回家去把你", data: i });
    
    let params = req.query;
    let sql = $sql.goods.goodsDelete;
    let { id } = params;
    let goods_detail_id = id; // (uuid.v1()).replace(/-/g, "")
    let paramsArray = [goods_detail_id];
    $http.connPool(sql, paramsArray, (err, result) => {
      console.log("===result===", result);
      if (err)
        return $http.writeJson(err, {
          code: 206,
          message: " 操作失败",
          data: null
        });
      console.log("===result===", result);
      if (result.affectedRows <= 0) return  $http.writeJson(res, { code: 207, message: "暂无此数据", data: id});
        return $http.writeJson(res, { code: 200, message: "操作成功" });
    });
  },
  /* 删除商品-end */

    /* 批量删除商品-start */
    goodsDeleteList(req, res) {
      // if(i == 0) return $http.writeJson(res, { code: "====S=====B====", message: "别点了，傻逼，回家去把你", data: i });
      $http.userVerify(req,res, ()=> {
        let params = req.body;
        // let sql = $sql.goods.goodsDeleteList;
         let { ids } = params;
        let idList=  ids.map(item => {
         return "'" + item + "'"
         })
         console.log('===idList===', idList)
         let sql = 'delete from goods_detail where goods_detail_id in (' + idList + ')';
         let goods_detail_id = ids; // (uuid.v1()).replace(/-/g, "")
          let paramsArray = [];
         console.log('goods_detail_id', goods_detail_id)
         $http.connPool(sql, paramsArray, (err, result) => {
           console.log("===result===", result, err, res);
           if (err)
             return $http.writeJson(err, {
               code: 206,
               message: " 操作失败",
               data: null
             });
           console.log("===result===", result);
           if (result.affectedRows <= 0) return  $http.writeJson(res, { code: 207, message: "暂无此数据"});
             return $http.writeJson(res, { code: 200, message: "操作成功" });
         });
      })
     
    },
    /* 批量删除商品-end */
};

module.exports = goods;
