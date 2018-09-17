import { Shop } from 'shop-model.js';
var shop = new Shop(); //实例化 首页 对象
// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopnum:0,
    count:0.0,
    rebate:0,
    num:1,
    address:true,//是否弹出地址添加
    checkAll:0,
    checked:false,
    minusStatus: 'disabled'
  },
  /* 点击减号 */
  bindMinus: function (e) {
    let index = shop.getDataSet(e, 'index'),
      id = shop.getDataSet(e, 'id'),
      carts = this.data.carts,
      num = carts[index].cartNum;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    carts[index].cartNum = num;
    let data = { cartId: id, cartNum: num };
    shop.updateNum(data, (data) => {
     
    });
    this.setData({
      carts: carts,
      minusStatus: minusStatus
    });
    this.setSprice();
  },
  /* 点击加号 */
  bindPlus: function (e) {
    let index = shop.getDataSet(e,'index'),
      id = shop.getDataSet(e, 'id'),
      carts = this.data.carts,
      num = carts[index].cartNum;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    carts[index].cartNum = num;
    let data = {cartId:id,cartNum:num};
    shop.updateNum(data,(data)=>{
     
    });
    this.setData({
      carts:carts,
      minusStatus: minusStatus
    });
    this.setSprice();
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    let index = shop.getDataSet(e, 'index'),
      id = shop.getDataSet(e, 'id'),
      carts = this.data.carts;
     carts[index].cartNum=num;
     let data = { cartId: id, cartNum: num };
     shop.updateNum(data, (data) => {
      
     });
    // 将数值与状态写回  
    this.setData({
      carts: carts
    });
    this.setSprice();
  },
  // 全选
  select_all: function (e) {
    let check = this.data.carts;
    var checked = this.data.checked ? false : true; 
    let isCheck = checked ? 1 : 0, checkAll = checked?check.length:0;

    for(let i=0;i<check.length;i++){
      check[i].isCheck = isCheck;
    }
    
    var checked = this.data.checked?false:true; 
    let data = { isCheck: isCheck};
    shop.isCheck(data,(data)=>{
       
    });
    this.setData({
      checked: checked,
      carts: check,
      checkAll: checkAll,
    });
    this.setSprice();
  },
  onLoad: function (options) {
    this._loadData();
  },
  _loadData:function(){
     
     this.showCarts();
  },
  //刷新购物车
  showCarts:function(){
    let that = this;
    shop.cartsShow((data) => {
     
      that.setData({
        carts: data.data
      });
      this.setSprice();
    });
  },
  setSprice:function(){
    let carts = this.data.carts;
    let sprice=0;
    console.log(carts+"-----------------");
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].isCheck==1){
        sprice += (carts[i].goods.goodsPriceone / 1 * carts[i].cartNum);
      }
    }
    this.setData({
      count: sprice
    });
  },
  //单选
  checkboxChange:function(e){
    let index = shop.getDataSet(e,'index');
    let id = shop.getDataSet(e, 'id');
    let carts = this.data.carts;
    let isCheck = carts[index].isCheck == 1 ? 0 : 1;
    carts[index].isCheck = isCheck ;
    let data = { cartId:id,isCheck: isCheck };
    shop.isCheck(data, (data) => {
      //成功判断
    });
    this.setData({
      carts: carts
    });
    this.setSprice();
  },
  //去支付
  goBuy:function(){
    let that = this;
    let count = this.data.count;
 
    if(count==0){//为选择商品
      wx.showToast({
        title: '请先选择商品',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      return false;
    }


    
    shop.goBuy((data)=>{
      
      if(data.address==0){//弹出添加地址
        
        that.setData({
          address:false
        });
        return false;
      }
      if(data.code==200){
        
        shop.pay(data.orderNo);
        this.showCarts();
      }
    });
   
   

   

   
  },
  //取消按钮  
  cancel: function () {
   
    this.setData({
      address: true
    });
  },
  //确定按钮  
  confirm:function(){
    let addr = this.data.addr,
      name = this.data.name,
        phone = this.data.phone;

    if (!addr){
      wx.showToast({
        title: '请输入地址',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (!name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      return false;
    }
    if (!phone) {
      wx.showToast({
        title: '请输入电话',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      return false;
    }

    //保存输入的地址
    let data = { address:addr,name:name,phone:phone};
    shop.addAddress(data,(data)=>{
      if (data.statuscode==-1){
          wx.showToast({
            title: '添加失败',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
          return false;
        }
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1000,
        mask: true
      })
      this.data.address = true;
    })
  },
  //输入框
  addr:function(e){
    this.data.addr = e.detail.value;  
  },
  phone:function(e){
    this.data.phone = e.detail.value;  
  },
  name: function (e) {
    this.data.name = e.detail.value;
  },

  
  
  
})