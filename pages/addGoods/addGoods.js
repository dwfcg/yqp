import { AddGoods } from 'addGoods-model.js'
var addgoods = new AddGoods();
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    isGroup:1,//1拼团,2不拼团
    // input默认是1  
    num: 1,
    // 使用data数据对象设置样式名  
    minusStatus: 'disabled',
    //图片数据
    img:[],
    firstImg:'',
    color:[],//颜色
    size:[],//尺码
    activeColor:0,//选中颜色
    activeSize:0,//选中尺码
    goodsId:0,//商品id
    shops:[]//采购车数据
  },
  onLoad:function(options){
    this.setData({
      isGroup: options.isGroup
    });
    
    //判断是批量还是一起批

    var goodsid = options.goodsid,
        that = this;

    wx.request({
      url: 'https://www.jz2025.com/api/Goods/getFootDetail',
      method:'POST',
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      data:{'goodsid':goodsid},
      success:function(res){
        console.log(res);
        var img = res.data.data.img,
            color= res.data.data.color,
            size = res.data.data.size;
      
          let  path = '';
         
          for (var item in img) {
            path = img[item];
          //匹配网址
          var n = path.search("[a-zA-z]+://[^\s]*");
          if (n == -1) {
            img[item] = 'https://www.jz2025.com/' + path ;
          }

        }
        that.setData({
          firstImg:img[0],
          img: img,
          color:color,
          size:size,
          
          goodsId:goodsid
        })
      }
    })
    
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },

  //颜色选中事件
  colorActive:function(e){
    var color = e.currentTarget.dataset.index;
    this.setData({
        activeColor:color
    });
  },
  //尺码选中事件
  sizeActive: function (e) {
    var size = e.currentTarget.dataset.index;
    this.setData({
      activeSize: size
    });
  },
  //加入采购车
  addShop:function(e){
      
      this.getGoods(true);
  },
  getGoods:function(isMsg){
    let that = this;
    var goodsId = this.data.goodsId,
      color = this.data.color[this.data.activeColor],
      size = this.data.size[this.data.activeSize],
      num = this.data.num;
    
    var shops = this.data.shops;
   
    var temp=false;//状态判断
    
    if(!temp){
    
      shops= {goodsId:goodsId,color:color.id,size:size, num:num};
      //此处加入购物车
      wx.request({
        url: 'https://www.jz2025.com/api/Shops/addCarts',
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        data: shops,
        success: function (res) {
          let data=res.data;
          if (isMsg){
            that.alert(data.msg);
          }
        

        }
      })

    }
    console.log(shops);
   
    
    
      this.setData({
        shops: shops

      });
  },
  alert:function(title){
    wx.showToast({
      title: title,
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  //确认
  goShop:function(){
    this.getGoods(false);
    wx.navigateTo({
      url: '../shop/shop?shops',
    })
  }, 
  //拿样
  Buyone:function(){
      //生成订单
    let that = this;
    var goodsId = this.data.goodsId,
      color = this.data.color[this.data.activeColor],
      size = this.data.size[this.data.activeSize],
      shops = { goodsId: goodsId, color: color.id, size: size};
    addgoods.setOrders(shops,(data)=>{
      if (data.code == 200) {

        addgoods.pay(data.orderNo);
        
      }
    });
      
  },
  


})  