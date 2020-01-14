const dataHandle = {
  /**
   *将数组部分数据封装成对象返回
   *
   * @param {*} dataList
  */
  arrayHandleObj(dataList) {
    console.log(dataList, !dataList)
    if(dataList.length == 0) return {}
  const imgList =  dataList.map(item => {
     return {img_path: item.img_path}
   })
   const {img_path, ...data} = dataList[0]
   return {...data, imgList}
  }
  
}

module.exports = dataHandle