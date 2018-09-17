import { Orders } from './orders-model.js';
var orders = new Orders();
// pages/orders/orders.js
var app = getApp()
Page({
  suo: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 3,
    ordersAll:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.currentTab){
      let currentTab = options.currentTab;
      this.setData({
        currentTab: currentTab
      });
    }
    
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    this.getOrders(this.data.currentTab);
  },
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
    this.getOrders(this.data.currentTab);
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
    this.onLoad();
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
  //获取订单信息
  getOrders:function(status){
    let that = this;
    orders.getOrders(status,(data)=>{
      console.log(data.data);
      that.setData({
        ordersAll:data.data
      });
      
    });
  },
  //确认收货
  qrsh:function(e){
    let ordersNo = orders.getDataSet(e, 'no');
    orders.getShop(ordersNo,(res)=>{
      this.getOrders(this.data.currentTab);
    });
  },
  //取消订单
  delOrders:function(e){
    let ordersNo = orders.getDataSet(e,'orderno');
    orders.delOrders(ordersNo,(data)=>{
      if(data.statuscode==0){//取消订单成功后刷新
        this.getOrders(this.data.currentTab);
        wx.showToast({
          title: data.message,
          icon: 'success',
          duration: 2000
        })
      }

      console.log(data);
    });
  },
  //支付
  pay:function(e){
    let ordersNo = orders.getDataSet(e, 'orderno');
    orders.pay(ordersNo,(data)=>{
      this.getOrders(this.data.currentTab);
    });
    
   //
  },
  //评论
  goComment:function(e){
    let orderNo = orders.getDataSet(e,'no');
    wx.navigateTo({
      url: '../comment/comment?orderNo=' + orderNo,
    })
  },
  
tsfh:function(){
  wx.showToast({
    title: '已提醒商家发货',
    icon: 'success',
    duration: 3000
  });
}  ,
  refund:function(e){
    let orderNo = orders.getDataSet(e, 'no');
    wx.navigateTo({
      url: '../refund/refund?orderNo=' + orderNo,
    })
  }


})