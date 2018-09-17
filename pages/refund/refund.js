import {Refund} from './refund-model.js';
var refund = new Refund();
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
    let orderNo = options.orderNo
        , that= this;

    refund.getOrder(orderNo,(res)=>{
        let order = res.data,
          goods = order.ordergoods;
        console.log(order);

        that.setData({
          order: order,
          goods: goods[0]
        });
    });

    
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
  getInput:function(e){
    var title = e.detail.value;
    this.setData({
      title:title
    });
  },
  goRefund:function(){
    let title = this.data.title;
  
    let data = { orderNo: this.data.order.orderNo, orderid: this.data.order.orderId,msg:title};
    

    refund.refund(data,(res)=>{
      if (res.statuscode==0){
        wx.navigateBack();
        return false;
      }
      wx.showToast({
        title: res.msg,
        icon: 'loading',
        duration: 3000
      });
    });
  }
})