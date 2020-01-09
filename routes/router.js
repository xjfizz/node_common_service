let express = require('express');

// 路由引入
let user = require('../controls/user');
let company = require('../controls/company');
let file = require('../controls/file');

//文件处理
let multer = require('multer');
// let upload = multer({dest: 'public/files/images'})
let upload = multer({dest: '../../../nginx/file/image'})


let api = require('../config/api');

let router = express.Router();

// user-用户管理
router.post(api.userLogin, user.login) // 登录
router.post(api.userList, user.list)  // 用户列表
router.post(api.userAdd, user.add)  // 添加用户

// 公司官网
router.post(api.companyLunBoImg, company.lunboList ); // 首页轮播图

router.get(api.contactList, company.contactList ); // 获取联系列表

// 文件相关
router.post(api.fileUpload, upload.single('file'), file.fileUpload); // 上传文件
router.delete(api.fileDelete, file.fileDelete); // 删除文件
router.put(api.fileUpdate, upload.single('file'), file.fileUpdate); // 更新文件

module.exports = router;