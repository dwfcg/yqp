import { Gobuy } from '../gobuy/gobuy-model.js';
import { MakeSure } from 'makesure-model.js';
import { Address } from '../address/address-model.js';
var address = new Address();
var gobuy = new Gobuy();
var makesure = new MakeSure();
Page({

  data: {
    num: 1,
    minusStatus: 'disabled',
    cent: [{
      
    },]
  },
  /* 点击减号 */
  bindMinus: function (e) {
    var num = this.data.num;
    var money = this.data.samplemoney;
    // 如果大于1时，才可以减
    if (num > 1) {
      num--;
      money = money * num;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      money: money,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function (e) {
    var num = this.data.num;
    var money = this.data.samplemoney;
    // 不作过多考虑自增1
    num++;
    money = money * num;
    // 只有大于一件的时候，才能normal状态，否则disable状态
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回
    this.setData({
      num: num,
      money: money,
      minusStatus: minusStatus
    });
    console.log(money)


  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    var money = this.data.cent[0].money;
    money = money * num;
    // console.log(money)

    // 将数值与状态写回
    this.setData({
      num: num,
      money: money,
    });
  },
  button: function (e) {
    let num = this.data.num;
    let money = this.data.money;
    let addressid = this.data.addressid;
    let orderNo = this.data.orderNo;
    console.log(num);
    console.log(money)
    console.log(addressid)
    console.log(orderNo)
    var data={num:num,money:money,addressid:addressid,orderNo:orderNo};
    makesure.editOrder(data,(data)=>{
      console.log(data);
     makesure.pay(data.orderNo);
    });

  },
  onLoad: function (options){
    var that=this;
    var orderNo = options.orderNo;
    makesure.getOrder(orderNo,(data)=>{
       
        var data=[data];
      console.log(data);
        that.setData({
          num: data[0].ordergoods[0].goodsNum,
          money: data[0].goodsMoney,
          samplemoney: data[0].ordergoods[0].goodsPrice,
          cent: data,
          orderNo: data[0].ordergoods[0].orderNo
        });
        console.log(that.data.money);
    });
    that.getAddress();
  },
  getAddress: function () {
    let that = this;
    gobuy.getAddress((data) => {
      console.log(data.data[0]);
      that.setData({
        address: data.data[0],
        addressid: data.data[0].addressId
      });
    });
  },
  selectAddress: function () {
    wx.navigateTo({
      url: '../selectaddress/selectaddress',
    })
  },
  onShow: function () {
    var addressid = wx.getStorageSync('addressid');
    if (addressid) {
      this.setData({
        addressid: addressid
      });
      console.log(addressid);
      address.getAddressByid(addressid, (data) => {
        console.log(data);
        wx.setStorageSync('addressid', '');
        this.setData({
          address: data.data
        });
      })
    } else {
      this.getAddress();
    }


  }
})