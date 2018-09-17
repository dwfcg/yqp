// pages/sample/sample.js
import { Sample} from '../sample/sample-model.js';
import {Orders} from '../orders/orders-model.js';
import{AddGoods} from '../addGoods/addGoods-model.js';
var addgoods = new AddGoods;
var  sample=new Sample();
var orders = new Orders();
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
      var that=this;
      that._loaddata();
  },
  _loaddata:function(){
      this.getsample();
  },
  getsample:function(){
    sample.getsample((data)=>{
      console.log(data);
      this.setData({
        ordersAll: data.data
      });
    });
  },
  //确认收货
  qrsh: function (e) {
    let ordersNo = orders.getDataSet(e, 'no');
    orders.getShop(ordersNo, (res) => {
      this.getsample();
    });
  },
  //取消订单
  delOrders: function (e) {
    let ordersNo = orders.getDataSet(e, 'orderno');
    orders.delOrders(ordersNo, (data) => {
      if (data.statuscode == 0) {//取消订单成功后刷新
        this.getsample();
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
  pay: function (e) {
    let ordersNo = orders.getDataSet(e, 'orderno');
    orders.pay(ordersNo, (data) => {
      this.getsample();
    });

    //
  },
  tsfh:function(e){
    var that=this;
    var index=sample.getDataSet(e,'index');
    console.log(index);
    var data = that.data.ordersAll[index];
    console.log(data);
    var goodsId = data.ordergoods[0].goodsId,
      color = data.ordergoods[0].color,
      size = data.ordergoods[0].size,
      makeOrder = { goodsId: goodsId, color: color, size: size ,is_make:1};
    wx.setStorageSync('makeOrder', makeOrder);
      wx.switchTab({
        url: '../makeorder/makeorder',
      })
   
   
  // wx.showToast({
  //   title: '已提醒商家发货',
  //   icon: 'success',
  //   duration: 3000
  // });
  }  ,
  refund:function(e){
    let orderNo = orders.getDataSet(e, 'no');
    wx.navigateTo({
      url: '../refund/refund?orderNo=' + orderNo,
    })
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