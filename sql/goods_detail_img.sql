/*
Navicat MySQL Data Transfer

Source Server         : demo_weekly
Source Server Version : 80017
Source Host           : localhost:3306
Source Database       : week_manage

Target Server Type    : MYSQL
Target Server Version : 80017
File Encoding         : 65001

Date: 2020-01-13 09:22:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods_detail_img
-- ----------------------------
DROP TABLE IF EXISTS `goods_detail_img`;
CREATE TABLE `goods_detail_img` (
  `id` int(32) NOT NULL AUTO_INCREMENT,
  `userId` int(32) DEFAULT NULL,
  `path` varchar(255) DEFAULT '',
  `create_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods_detail_img
-- ----------------------------
INSERT INTO `goods_detail_img` VALUES ('1', '1', 'https://img.alicdn.com/imgextra/i1/2986712394/O1CN01l2HpnN1TYUjfydbSl_!!2986712394.jpg', '2019-12-12 09:02:34.000000');
INSERT INTO `goods_detail_img` VALUES ('2', '2', 'https://img.alicdn.com/imgextra/i1/2986712394/O1CN01z7KxnE1TYUjC6Tc7s_!!2986712394.jpg', '2019-12-11 09:03:10.000000');
INSERT INTO `goods_detail_img` VALUES ('3', '2', 'https://img.alicdn.com/imgextra/i1/2986712394/O1CN01l2HpnN1TYUjfydbSl_!!2986712394.jpg', '2019-12-19 09:03:14.000000');
INSERT INTO `goods_detail_img` VALUES ('4', '2', 'https://img.alicdn.com/imgextra/i1/2986712394/O1CN01z7KxnE1TYUjC6Tc7s_!!2986712394.jpg', '2019-12-18 09:03:19.000000');
INSERT INTO `goods_detail_img` VALUES ('5', '2', 'https://img.alicdn.com/imgextra/i1/2986712394/O1CN01l2HpnN1TYUjfydbSl_!!2986712394.jpg', '2019-12-26 09:03:22.000000');
INSERT INTO `goods_detail_img` VALUES ('6', '123', 'https://gd2.alicdn.com/imgextra/i3/0/O1CN01fFIyoI1PxuGu6TSw5_!!0-item_pic.jpg', '2019-12-26 09:03:26.000000');
INSERT INTO `goods_detail_img` VALUES ('7', '123', 'https://gd1.alicdn.com/imgextra/i1/268021908/O1CN011PxuAXCyqO8x9oI_!!268021908.jpg', '2019-12-27 09:03:30.000000');
INSERT INTO `goods_detail_img` VALUES ('8', '123', 'https://gd1.alicdn.com/imgextra/i1/268021908/O1CN01bCEa3D1PxuGD6KpHZ_!!268021908.jpg', '2019-12-25 09:03:36.000000');
INSERT INTO `goods_detail_img` VALUES ('9', '123', 'https://gd2.alicdn.com/imgextra/i3/0/O1CN01fFIyoI1PxuGu6TSw5_!!0-item_pic.jpg', '2020-01-01 09:03:40.000000');
