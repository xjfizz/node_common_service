// node 后端服务器
const router = require('./routes/router');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 后端api路由
app.use(router);

// 监听端口

app.listen(9999);
console.log('服务已启动http://localhost:9999')