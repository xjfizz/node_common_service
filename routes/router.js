let express = require('express');

// 路由引入
let user = require('../controls/user');
let company = require('../controls/company');


let api = require('../config/api');

let router = express.Router();

// user-用户管理
router.post(api.userLogin, user.login) // 登录
router.post(api.userList, user.list)  // 用户列表
router.post(api.userAdd, user.add)  // 添加用户

// 公司官网
router.post(api.companyLunBoImg, company.lunboList ); // 首页轮播图

router.get(api.contactList, company.contactList ); // 获取联系列表

module.exports = router;