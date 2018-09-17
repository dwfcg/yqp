import { Share } from 'share-model.js';
var share = new Share(); //实例化 首页 对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    share.getCode((res)=>{
      that.setData({
        code: res.Invite
      });
    });
    share.getShare((res) => {
      that.setData({
        ShareImg: res
      });
    });
    share.getInvite((res)=>{
      let users = res.users;
     
      for (var i = (users.length ); i < 5; i++) {
        users[i] = {};
      }
      
      that.setData({
        users: users,
        intive:res
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
  mycode:function(e){
    this.setData({
      mycode: e.detail.value
    });
  },
  myname:function(e){
    this.setData({
      myname: e.detail.value
    });
  },
  myphone:function(e){
    this.setData({
      myphone: e.detail.value
    });
  },
  copyTBL: function (e) {
    var self = this;
    wx.setClipboardData({
      data: self.data.code,
      success: function (res) {
        // self.setData({copyTip:true}),
        
        wx.showModal({
          title: '提示',
          content: '复制成功',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let imageUrl = this.data.ShareImg;
    console.log(this.data.code);
    return {
      title: '一起批。批好货',
      path: '/pages/index/index?code='+this.data.code,
      imageUrl: imageUrl[0]
    }
  },
  getCode:function(){
    let that = this;
    share.getcode((res)=>{
      if(res.code==-1){
        //未绑卡
        that.setData({
          hiddenmodalput: !this.data.hiddenmodalput,
        });
        return;
      }
      
      if (res.code == 0) {
        wx.showToast({
          title: '提现失败',
          icon: 'loading',
          duration: 1000,
          mask: true
        })
        return;
      }
      if (res.code == 100) {
        wx.showToast({
          title: '金额不足',
          icon: 'loading',
          duration: 1000,
          mask: true
        })
        return;
      }
      if (res.code == 200) {
        share.getInvite((res) => {
          let users = res.users;

          for (var i = (users.length); i < 5; i++) {
            users[i] = {};
          }

          that.setData({
            users: users,
            intive: res
          });

        });
        wx.showModal({
          title: '提示',
          content: '提现请求将在每周一统一处理',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
        return;
      }
    });
  },
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    });
  },
  confirm:function(){
    let that = this;
    if (!this.data.mycode || !this.data.myname || !this.data.myphone){
      wx.showToast({
        title: '需全部输入',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      return;
    }
    let data = { code: this.data.mycode, name: this.data.myname, phone: this.data.myphone};
    share.setCode(data,(res)=>{
      that.setData({
        hiddenmodalput: !this.data.hiddenmodalput,
      });
      if(res.code==0){
        wx.showToast({
          title: '提现失败',
          icon: 'loading',
          duration: 1000,
          mask: true
        })
        return;
      }
      if (res.code == 100) {
        wx.showToast({
          title: '金额不足',
          icon: 'loading',
          duration: 1000,
          mask: true
        })
        return;
      }
      if (res.code == 200) {
        wx.showModal({
          title: '提示',
          content: '提现请求将在每周一统一处理',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
        return;
      }
    });
  }
})