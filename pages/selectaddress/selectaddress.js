import { Address } from '../address/address-model.js';
var address = new Address();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress();
  },
  getAddress: function () {
    let that = this;
    address.getAddress((data) => {
      console.log(data.data);
      that.setData({
        address: data.data
      });
    });
  },
  back:function(){
    var id=this.data.id;
    if(!id)
    {
      wx.showToast({
        title: '请选择',
        icon:'none'
      })
      return false;
    }
    wx.setStorage({
      key: 'addressid',
      data: id,
    })
    wx.navigateBack({
      delta: 1
    })
  },
  radioChange: function (e) {
    this.setData({
      id: e.detail.value
    });
  },
  onShow: function () {
    this.getAddress();
  }
})