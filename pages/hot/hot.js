import { Hot } from 'hot-model.js';
var hot = new Hot(); //实例化 首页 对象
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shops:[],
    last_page:0,//总页数
    current_page:0,//当前页数
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();  
    
  },
  _loadData: function (callback){
    var that=this;
    hot.getHotData(1,(data)=>{
      that.getImg(data.data);
        that.setData({
          
          last_page:data.last_page,
          current_page: data.current_page,
        })
    });
  },
  //按钮跳转
  addGoods: function (event) {
    var goodsid = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '../shop-details/shop-details?goodsid=' + goodsid,
    })
  }, 
  //下拉加载事件
  searchScrollLower:function(){
    
    
    let that = this;
    let page = this.data.current_page+1;
    if (!(page > this.data.last_page)){
      wx.showToast({
        title: '加载中',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      hot.getHotData(page, (data) => {
        let shops = this.data.shops;
        shops=shops.concat(data.data);
        that.getImg(shops);
        that.setData({
          
          last_page: data.last_page,
          current_page: data.current_page,
        })
      });
    }else{
      wx.showToast({
        title: '已加载全部',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    }
    
    
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
    console.log(1);
    this.setData({
      shops: shops
    });

  }
  
  
})