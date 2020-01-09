const $sql = require("../sql/sqlMap");
const $http = require("../sql/http");
const $time = require("../utils/time");
const path = require("../config/file")
// const multiparty = require('multiparty')
// const multer = require('multer')
const fs = require("fs");
// const upload = multer({dest: 'upload_tmp/'});
const uuid = require('node-uuid')

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

const file = {
  /* 上传文件-start */
  fileUpload(req, res) {
    console.log('========debug======')
    console.log('========req======', req)
   // return $http.writeJson(res, {code:-2, message:'失败',errMsg: 'err'})
  //return $http.writeJson(res, {message:'三生三世',file: req.file});
    let ret = {};
    ret["code"] = 20000;
    let file = req.file;
    let fileNameArr = file.originalname.split(".");
    let suffix = fileNameArr[fileNameArr.length - 1];
    if (file) {
    
      // 文件重命名
      fs.renameSync(
        "../../../nginx/file/image/" + file.filename,
        `../../../nginx/file/image/${file.filename}.${suffix}`
      );
      file["newfilename"] = `${file.filename}.${suffix}`;
    }
    ret["file"] = file;
    //let id = file.filename;
    // v1 根据时间戳和随机数生成的uuid
    let id = (uuid.v1()).replace(/-/g, "")
    // let path =  `../../../nginx/file/image/${file.filename}.${suffix}`
    let path =  `/file/image/${file.filename}.${suffix}`
    let create_time = $time.formatTime()
    let sql =$sql.file.fileUpload
    let paramsArr =  [id, path, create_time]
    $http.connPool(sql,paramsArr, (err,result) => {
      if(err) return $http.writeJson(res, {code:206,message: '失败', errMsg: err})
      if(result.affectedRows != 1) return $http.writeJson(res, {code: 206, message: '添加失败，id重复'})
      return $http.writeJson(res,{code: 200, message: '添加成功'})
    })
    // res.send(ret);
  },

  /* 上传文件-end */

  /* 删除文件-start */
  fileDelete(req,res) {
    let id = req.params.id
    let sql = $sql.file.fileDelete
    let paramsArr = [id] 
    let path = null
    $http.connPool($sql.file.fileById, paramsArr, (err,result) => {
      console.log(err,result)
      if(err) return $http.writeJson(res, {code:206,message: '失败', errMsg: err})
      if(result.length == 0) return $http.writeJson(res, {code: 206, message: '操作失败，id不存在'})
      result = JSON.parse(JSON.stringify(result))
      path = result[0].path
       // 数据库删
    $http.connPool(sql,paramsArr, (err,result) => {
      console.log('===result===', result)
      if(err) return $http.writeJson(res, {code:206,message: '失败', errMsg: err})
      
      // 文件删除
      fs.unlinkSync('../../../nginx' + path);
      return $http.writeJson(res, {code:200, message:'操作成功'})
    })

    })
  

  },
  /* 删除文件-end */

    /* 更新文件-start */
    fileUpdate(req,res) {
      console.log('========debug======')
    console.log('========req======', req)
    console.log('========body======', req.body)
    let ret = {};
    ret["code"] = 20000;
    let file = req.file;
    let id = req.body.id
    let fileNameArr = file.originalname.split(".");
    let suffix = fileNameArr[fileNameArr.length - 1];
    if (file) {
    
      // 文件重命名
      fs.renameSync(
        "../../../nginx/file/image/" + file.filename,
        `../../../nginx/file/image/${file.filename}.${suffix}`
      );
      file["newfilename"] = `${file.filename}.${suffix}`;
    }
    ret["file"] = file;
  
    let path =  `/file/image/${file.filename}.${suffix}`
    let create_time = $time.formatTime()
    let sql =$sql.file.fileUpdate
    let paramsArr =  [ path, id]
    $http.connPool(sql,paramsArr, (err,result) => {
      if(err) return $http.writeJson(res, {code:206,message: '失败', errMsg: err})
      // if(result.affectedRows != 1) return $http.writeJson(res, {code: 206, message: '操作失败，id重复'})
      return $http.writeJson(res,{code: 200, message: '操作成功'})
    })
    // res.send(ret);
  
    },
    /* 更新文件-end */
};

module.exports = file;
