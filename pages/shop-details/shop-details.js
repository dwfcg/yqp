import { ShopDetails } from 'shop-details-model.js';
var shopDetails = new ShopDetails();
// pages/shop-details/shop-details.js
var app = getApp(

)
Page({
  data: {
    flag: false,
    arry: [
      { src: " ", text: "工厂直供" },

      { src: "", text: "一件起批" },

      { src: "", text: "送货到店" },

      { src: "", text: "30天退换" },

    ],
    arr:[
      { text1: "流行元素", type:'goodsElement'  },
      { text1: "鞋&nbsp;&nbsp;头&nbsp;&nbsp;型", type: "goodsToecap" },
      { text1: "货源类别", type: "goodsCategory" },
      { text1: "风&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格", type: "goodsStyle" },
      { text1: "鞋面材质", type: "goodsVamp" },
      { text1: "内里材质", type: "goodsMaterial" },
    ]
  },
  
  a: function () {
    this.setData({ flag: true })
  },
  b: function () {
    this.setData({ flag: true })
  } ,
  onLoad: function (options) {
    this._loadData(options);
  },
  _loadData: function (options){
    
    let goodsId = options.goodsid,
    
        that = this;
    this.setData({
      goodsId: goodsId
    });
    shopDetails.getShopDetails(goodsId,(data)=>{
        console.log(data);
        let arr = that.data.arr;
        let attr = data.data.attr;
        for (var p in attr) {
          for(var i in arr){
            if(p==arr[i].type){
              console.log(attr[p]);
              arr[i].text = attr[p];
            }
          }

        }
       let goodsDetailAll = data.data.shops.goodsDetail,path='';
       for (var item in goodsDetailAll) {
         path = goodsDetailAll[item];
         //匹配网址
         var n = path.search("[a-zA-z]+://[^\s]*");
         if (n == -1) {
           goodsDetailAll[item] = 'https://www.jz2025.com/' + path ;
         }

       }
      
        that.setData({
          shop:data.data,
          arr:arr,
          goodsDetailAll: goodsDetailAll,
          goodsDetail: [goodsDetailAll[0]]
        });
        
        that.getImg(data.data);
    });
  },
  //按钮跳转
  addGoods: function (event) {
    var goodsid = event.currentTarget.dataset['id'],
      isGroup = event.currentTarget.dataset['isgroup'];
    
    wx.navigateTo({
      url: '../addGoods/addGoods?goodsid=' + goodsid+"&isGroup="+isGroup,
    })
  }, 
  //下拉加载
  onReachBottom:function(){
    let goodsDetailAll = this.data.goodsDetailAll, all = goodsDetailAll.length;
    let goodsDetail = this.data.goodsDetail, num = goodsDetail.length;
      
      if(num <all){
        goodsDetail.push(goodsDetailAll[num]);
        this.setData({
          goodsDetail: goodsDetail
        });
      }
      
   
  },
  //跳转首页
  toIndex:function(){
    wx.reLaunch({ 
      url: '/pages/index/index'
    })
  },
  //处理图片
  getImg: function (data) {
    let shops = data.img.img,
      path = '';
      
    for (var item in shops) {
      path = shops[item];
      //匹配网址
      var n = path.search("[a-zA-z]+://[^\s]*");
      if (n == -1) {
        shops[item] = 'https://www.jz2025.com/' + path + '300x300.jpeg';
      }

    }
    
    this.setData({
      shops: shops
    });

  },
  //分享按钮
  onShareAppMessage:function(){
    let name = this.data.shop;
    //预留用户id
    return {
      title: '一起批、工厂直供、免费铺货'+name.shops.goodsName,
      path: '/page/shop-details/shop-details?goodsId=' + this.data.goodsId,
    }
  }
})
