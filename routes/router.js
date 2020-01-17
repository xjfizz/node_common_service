let express = require('express');

// 路由引入
let user = require('../controls/user');
let company = require('../controls/company');
let file = require('../controls/file');
let goods = require('../controls/goods');
let report = require('../controls/report');

// 文件处理
let multer = require('multer');
// let upload = multer({dest: 'public/files/images'})
let upload = multer({dest: '../../../nginx/file/image'})

// 请求接口路径
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

// 商品信息
router.get(api.goodsList, goods.goodsList), // 获取商品列表
router.get(api.goodsImgList, goods.goodsImgList), // 获取商品图片列表-测试
router.post(api.goodsAdd, goods.goodsAdd), // 添加商品
router.put(api.goodsUpdate, goods.goodsUpdate), // 更新商品
router.delete(api.goodsDelete, goods.goodsDelete), // 删除商品
router.delete(api.goodsDeleteList, goods.goodsDeleteList), //批量删除图片 

// 日报管理
router.get(api.reportList, report.reportList), // 获取日报列表

module.exports = router;