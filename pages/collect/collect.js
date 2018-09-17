import { Collect } from 'collect-model.js';
var collect = new Collect();
 // pages/collect/collect.js
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
    this._DataLoad();
  },
  _DataLoad:function(){
    let that = this;
    collect.getCollect(1,(data)=>{
      console.log(data);
      that.setData({
        shops:data.data,
        last_page: data.last_page,
        current_page: data.current_page,
      });
    });

  },
  //按钮跳转
  addGoods: function (event) {
    var goodsid = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../shop-details/shop-details?goodsid=' + goodsid,
    })
  }, 
  //下拉加载事件
  searchScrollLower: function () {


    let that = this;
    let page = this.data.current_page + 1;
    if (!(page > this.data.last_page)) {
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      collect.getCollect(page, (data) => {
        let shops = this.data.shops;
        shops = shops.concat(data.data);
        that.setData({
          shops: shops,
          last_page: data.last_page,
          current_page: data.current_page,
        })
      });
    } else {
      wx.showToast({
        title: '已加载全部',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    }


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
  
  }
})