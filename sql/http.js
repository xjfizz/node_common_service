let mysql = require("mysql");
let db = require("../config/db");
let pool = mysql.createPool(db);
const jwt = require("jwt-simple");
const express = require("express");
const app = express();
app.set("jwtTokenSecret", "YOUR_SECRET_STRING");

const $http = {
  connPool(sql, val, cb) {
    console.log("sql:", sql);
    console.log("val:", val);
    console.log("db:", db);
    pool.getConnection((err, conn) => {
      let query = conn.query(sql, val, (err, result) => {
        if (err) {
          console.log(err);
        }
        cb(err, result);
        conn.release();
      });
    });
  },
  // json 格式
  writeJson(res, result) {
    console.log("===result1===", res, result);
    if (typeof result === "undefined") {
      res.send("err");
    } else {
      res.json(result);
      //res.send(result);
      // res.send('ok')
      // res.send('ok')
    }
  },
  // user验证
  userVerify(req, res, cb) {
    // cb()
    let isToken = true;
    if (!isToken) {
      return cb();
    }

    //let params = req.body
    //let userId = params.userId
    let resultData = {};
    console.log("token", !req.headers || !req.headers.token, res);
    if (!req.headers || !req.headers.token)
      return $http.writeJson(res, {
        code: 405,
        message: "客户端未携带token, 禁止访问"
      });
    let token = req.headers.token; // 获取前端请求头发送过来的token
    try {
      let decoded = jwt.decode(token, app.get("jwtTokenSecret"));
      if (decoded.exp <= Date.now()) {
        resultData = {
          code: 410,
          data: null,
          message: "登录过期"
        };
        $http.writeJson(res, resultData);
      } else {
        cb();
      }
    } catch (e) {
      resultData = {
        code: 410,
        data: null,
        error: e,
        message: "token异常"
      };
     return $http.writeJson(res, resultData);
    }



    // 无需通过userId

    //  if(!userId || decoded.iss !=userId) {
    //    resultData = {
    //      code: 406,
    //      data: null,
    //      message: 'userId有误'
    //    }
    //    $http.writeJson(res, resultData)
    //  } else {
    //    if(decoded.exp <= Date.now()) {
    //      resultData = {
    //        code: 410,
    //        data:null,
    //        message: '登录过期'
    //      }
    //      $http.writeJson(res,resultData)
    //    } else {
    //      cb()
    //    }
    //  }
  }
};

module.exports = $http;
