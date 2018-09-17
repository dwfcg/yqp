import { Shopcertification } from './shopcertification-model.js';
var shop = new Shopcertification();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input:{
      isShop:1,
    },
    img:{
      'orign':'../../ios/img_shouchi@2x.png',
      'scorign':'../../ios/img_shouchi@2x.png',
      'ShopRental':'../../ios/img_shouchi@2x.png',
      'HousingLease': '../../ios/img_shouchi@2x.png',
      'mp': '../../ios/img_shouchi@2x.png',
      'dz': '../../ios/img_shouchi@2x.png',
      'dn': '../../ios/img_shouchi@2x.png',
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  //获取input值
  getInput: function (e) {
    let key = shop.getDataSet(e, 'name'),
      value = e.detail.value,
      input = this.data.input;
    input[key] = value;
    this.setData({
      input: input
    });

  },
  //上传图片
  updateImg: function (e) {

    var that = this,
      name = shop.getDataSet(e, 'name'),
      img = this.data.img;
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //that.editImg(tempFilePaths)
        shop.uploadImg(tempFilePaths[0], (data) => {
          img[name] = data.data;
          that.setData({
            img: img
          });

        });

        //upload(that, tempFilePaths);
      }
    })
  },
  //提交数据
  getNext: function () {
    //组合文字和图片数据
    let input = this.data.input,
      img = this.data.img;
    input['orign'] = img['orign'];
    input['scorign'] = img['scorign'];
    input['ShopRental'] = img['ShopRental'];
    input['HousingLease'] = img['HousingLease'];
    input['mp'] = img['mp'];
    input['dz'] = img['dz'];
    input['dn'] = img['dn'];
         
    shop.apply(input, (res) => {
      if (res.statuscode == -1) {//验证数据未通过
        wx.showToast({
          title: res.message,
          icon: 'loading',
          duration: 1000,
          mask: true
        })
        return false;
      }
      wx.showToast({
        title: '提交成功',
        icon: 'success',
        duration: 1000,
        mask: true
      })
     
    });

  }
})