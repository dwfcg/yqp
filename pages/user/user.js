import { User } from 'user-model.js';
var user = new User();
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput:true,
    isInvite:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if (app.globalData.userInfo) {
      
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log(res);
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          //向数据库添加用户名
          let data = { userName: res.userInfo.nickName, userPhoto: res.userInfo.avatarUrl};
          user.setName(data,(data)=>{
            console.log(data);
          });
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


    //方法
    this._loadData();
    
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  _loadData:function(){
    let that = this;
    user.getHotData(1, (data) => {
      that.getImg(data.data);
      that.setData({
        
        last_page: data.last_page,
        current_page: data.current_page,
      })
    });

    user.getShare((res)=>{
      
      that.setData({
        ShareImg:res
      });
    });

    user.isInvite((res)=>{
      that.setData({
        isInvite: res.statuscode
      });
    });

    user.getFree((res)=>{
      that.setData({
        free:res.free,
        useFree:res.useFree
      });
     
    });

    //获取订单数量
    user.getOrders((data)=>{
      var data = data.data;
        that.setData({
          pay: data.Pay,
          share: data.share,
          confirm: data.confirm,
          appraise: data.appraise,
          refund: data.refund,
         
        });
    });

    user.UserIsApply((res)=>{
      console.log(res.statuscode);
      that.setData({
        apply:res.statuscode
      });
    });

    user.getCount((res)=>{
      that.setData({
        count:res.count,
        coupon:res.coupon
      });
    });
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
      user.getHotData(page, (data) => {
        let shops = this.data.shops;
        shops = shops.concat(data.data);
        that.getImg(shops);
        that.setData({
          
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
  //按钮跳转
  addGoods: function (event) {
    var goodsid = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../shop-details/shop-details?goodsid=' + goodsid,
    })
  }, 
  //我的收藏
  myCollect:function(){
    wx.navigateTo({
      url: '../collect/collect',
    })
  },
  myCarts:function(){
    wx.navigateTo({
      url: '../shop/shop',
    })
  },
  myOrders:function(e){
    let currentTab = user.getDataSet(e,'currenttab');
    wx.navigateTo({
      url: '../orders/orders?currentTab=' + currentTab,
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
    let that =this;
    //获取订单数量
    user.getOrders((data) => {
      var data=data.data;
     
      that.setData({
        pay: data.Pay,
        share: data.share,
        confirm: data.confirm,
        appraise: data.appraise,
        refund: data.refund,

      });
    });
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
    let imageUrl = this.data.ShareImg;
    return {
      title: '一起批。批好货',
      path: '/pages/share/share',
      imageUrl: imageUrl[0]
    }
  },
  toAddress:function(){
    wx.navigateTo({
      url: '../address/address',
    })
  },
  //处理图片
  getImg: function (data) {
    let shops = data,
      path = '';
    for (var item in shops) {
      path = shops[item].imgPath;
      //匹配网址
      var n = path.search("[a-zA-z]+://[^\s]*");
      if (n == -1) {
        shops[item].imgPath = 'https://www.jz2025.com/' + path + '300x300.jpeg';
      }

    }
    
    this.setData({
      shops: shops
    });

  },
  goApply:function(){
    user.isApply((res)=>{
      if(res.data.length==0 || res.data.isApply==3){
        wx.navigateTo({
          url: '../certification/certification',
        })
        return false;
      }
      wx.navigateTo({
        url: '../review/review?review=' + res.data.isApply + '&isApplyMsg=' + res.data.isApplyMsg,
   
      })
     // console.log(res);
    });
    
  },
  goShare:function(){
    wx.navigateTo({
      url: '../share/share',
    })
  },
  modalinput: function(){
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    });
  },
  confirm:function(e){
    let code = this.data.code;
    user.setInvite(code,(res)=>{
      if (res.statuscode==1){
        wx.showToast({
          title: res.message,
          icon: 'loading',
          duration: 1000,
          mask: true
        })
      }else{
        wx.showToast({
          title: '邀请成功',
          icon: 'success',
          duration: 1000,
          mask: true
        })
        this.setData({
          hiddenmodalput: !this.data.hiddenmodalput,
          isInvite:0
        });
      }
    });
  },
  
  setcode:function(e){
    this.setData({
      code: e.detail.value
    });
    
  },
  problems:function(){
    wx.navigateTo({
      url: '../problems/problems',
    })
  },
  rule:function(){
    wx.navigateTo({
      url: '../rule/rule',
    })
  }
  
})