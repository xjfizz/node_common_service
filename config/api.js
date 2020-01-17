let path = '/xujun';
module.exports = {
  // user-用户管理
  userLogin: path + '/user/login', // 用户登录
  userLogout: path + '/user/logout', // 用户登出
  userAdd: path + '/user/add', // 新增用户
  userUpdateInfo: path + '/user/updateInfo', // 更新用户信息
  userUpdateState: path + '/user/updateState', // 更新用户状态
  userDetail: path + '/user/detail', // 获取用户详情
  userList: path + '/user/list', // 获取用户列表

  // 公司官网
  companyLunBoImg: path + '/lunbo/imgList',// 获取公司官网首页轮播图片
  contact: path + '/contact/addContact', // 增加联系我们
  contactList: path + '/contact/contactList', // 增加联系我们

  // 文件相关
  fileUpload: path + '/file/upload', // 上传文件
  fileDelete: path + '/file/delete/:id', // 删除文件
  fileUpdate: path + '/file/update', // 更新文件

  // 商品信息
  goodsList: path + '/goods/list', // 商品列表(根据商家ID)
  goodsAdd: path + '/goods/add', // 添加商品
  goodsUpdate: path + '/goods/update', // 更新商品
  goodsDelete: path + '/goods/delete', // 删除商品(单个-根据ID)
  goodsDeleteList: path + '/goods/deleteList', // 删除商品(多个-根据ID list)
  goodsDetail: path + '/goods/detail', // 商品详情(根据商品ID)
  goodsImgList: path + '/goods/imgList', // 商品图片列表(根据商家ID)-测试接口

  // 日报管理
  reportList: path + '/report/list', // 日报列表

}