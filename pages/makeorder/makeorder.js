// pages/order/order.js
import { AddGoods } from '../addGoods/addGoods-model.js';
import { Gobuy } from '../gobuy/gobuy-model.js';
var addgoods = new AddGoods;
var gobuy = new Gobuy;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name1: null,name2: null,name3: null,name4: null,name5: null,
 name6: null,name7: null,name8: null,name9: null,name10: null,
    currentTab: 0,
    text: [{ text: '女鞋定制', num: 0},{text: '女装定制',num: 1},],
    shu: [{
      top: '22rpx',
      width: '200rpx',
      distance: '-21rpx;',
      about: 'right'
    },
    {
      top: '143rpx',
      width: '304rpx',
      distance: '-46rpx;',
      about: 'left'
    },
    {
      top: '193rpx',
      width: '268rpx',
      distance: '-21rpx;',
      about: 'right'
    },
    {
      top: '293rpx',
      width: '272rpx',
      distance: '-39rpx;',
      about: 'left'
    },
    {
      top: '363rpx',
      width: '96rpx',
      distance: '-21rpx;',
      about: 'right'
    },
    ],
    shu1: [{
      top: '446rpx',
      width: '274rpx',
      distance: '-28rpx;',
      about: 'left'
    },
    {
      top: '540rpx',
      width: '258rpx',
      distance: '-28rpx;',
      about: 'right'
    },
    {
      top: '604rpx',
      width: '253rpx',
      distance: '-21rpx;',
      about: 'left'
    },
    {
      top: '725rpx',
      width: '150rpx',
      distance: '-28rpx;',
      about: 'right'
    },
    {
      top: '725rpx',
      width: '150rpx',
      distance: '-21rpx;',
      about: 'left'
    },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress();
  },
  getAddress: function () {
    let that = this;
    gobuy.getAddress((data) => {
      console.log(data.data[0]);
      that.setData({
        addressid: data.data[0].addressId
      });
    });
  },
  clickTab: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {

      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
      console.log(that.data.currentTab)
    }
  },
  /* 输入框事件 */
  button1: function (e) {
    // 筒高小腿围脚长footLenth筒围尺码footsize
    let that = this;
    that.setData({
      name1: e.detail.value.name1,
      name2: e.detail.value.name2,
      name3: e.detail.value.name3,
      name4: e.detail.value.name4,
      name5: e.detail.value.name5,
      name6: e.detail.value.name6,
      name7: e.detail.value.name7,
      name8: e.detail.value.name8,
      name9: e.detail.value.name9,
      name10: e.detail.value.name10,
    })

    if (!that.data.currentTab){
      var makeOrder = wx.getStorageSync('makeOrder');
      wx.setStorageSync('makeOrder', '');
      if (!makeOrder)
      {
        wx.showToast({
          title: '未定制商品',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      var addressid=this.data.addressid;
      if (!addressid)
      {
        wx.showToast({
          title: '选择默认地址',
          icon: 'none',
          duration: 1500
        })
        return false;
      }
      makeOrder['addressid'] = addressid;
      makeOrder['tg'] =that.data.name1;
      makeOrder['tw'] = that.data.name2;
      makeOrder['xtw'] = that.data.name3;
      makeOrder['jc'] = that.data.name4;
      makeOrder['cm'] = that.data.name5;     
      console.log(makeOrder);
      addgoods.setOrders(makeOrder, (data) => {
        console.log(data.orderNo);
        wx.navigateTo({
          url: '../makessure/makessure?orderNo=' + data.orderNo,
        })
      });
      // var orderNo = '15370051016362';
      // wx.navigateTo({
      //   url: '../makessure/makessure?orderNo=' + orderNo,
      // })
    }
    
  },
  toaddress:function(){
    wx.navigateTo({
      url: '../address/address',
    })
  },
  tosample: function () {
    wx.navigateTo({
      url: '../sample/sample',
    })
  },
  tomakesure:function(e){
    var that=this;
    var makeOrder=wx.getStorageSync('makeOrder');
    // wx.setStorageSync('makeOrder', '');
    // if (!makeOrder)
    // {
    //   wx.showToast({
    //     title: '未定制商品',
    //     icon: 'none',
    //     duration: 1500
    //   })
    //   return false;
    // }
    // var addressid=this.data.addressid;
   
    // makeOrder['addressid'] = addressid;
    // console.log(makeOrder);
    // addgoods.setOrders(makeOrder, (data) => {
    //   console.log(data.orderNo);
    //   wx.navigateTo({
    //     url: '../makessure/makessure?orderNo=' + data.orderNo,
    //   })
    // });
    var orderNo ='15370003652864';
    // wx.navigateTo({
    //   url: '../makessure/makessure?orderNo=' + orderNo,
    // })
  }
})