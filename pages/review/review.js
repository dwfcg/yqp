Page({

  /**
   * 页面的初始数据
   */
  data: {
    isApply:0,
    isApplyMsg:'',
    title:['等待审核','审核通过','审核未通过'],
    view_title:[
      ['审核期间产生交易与成功邀请好友免费铺货','额度会更高'],
      ['恭喜您实名认证审核已通过','快去用户中心看看您获得多少免费铺货额度'],
      ['抱歉,您的实名认证信息未通过','根据以下原因进行修改重新提交认证资料']
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let isApply=options.review,
        title = this.data.title,
        isApplyMsg = options.isApplyMsg;
        

    wx.setNavigationBarTitle({
      title: title[isApply]
    })
    this.setData({
      isApply: isApply,
      isApplyMsg: isApplyMsg
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
  goIndex:function(){
    wx.switchTab({
      url: '../index/index'
    })
   
  },
  goUser: function () {
    wx.switchTab({
      url: '../user/user'
    })

  },
  goApply:function(){
    wx.navigateTo({
      url: '../certification/certification',
    })
  },
  //分享按钮
  onShareAppMessage: function () {
    //let name = this.data.shop;
    //预留用户id
    return {
      title: '一起批、工厂直供、免费铺货',
      path: '/page/shop-details/shop-details',
    }
  }
})