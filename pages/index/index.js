
import { Index } from 'index-model.js';
var index = new Index(); //实例化 首页 对象
Page({
  //页面加载时调用
  data:{
    hotShops:[],//热门商品
    img:{//首页图片管理
      'banner':{
        'pic_banner1':'https://www.jz2025.com/static/wx/index/pic_banner1@2x.png',
        'pic_banner2': 'https://www.jz2025.com/static/wx/index/pic_banner2@2x.png',//头部图片 
        'pic_banner3':'https://www.jz2025.com/static/wx/index/pic_banner3@2x.png'
      },
      
      'ico':{
        'gc': 'https://www.jz2025.com/static/wx/index/icon_gongchang@2x.png',
        'th':'https://www.jz2025.com/static/wx/index/icon_tuihuan @2x.png',
        'sh':'https://www.jz2025.com/static/wx/index/icon_tuihuo @2x.png',
        'yq':'https://www.jz2025.com/static/wx/index/icon_qipi @2x.png'
      },
      'classifyImg':{//分类图片
        'left':'https://www.jz2025.com/static/wx/index/pic_zhenpi@2x.png',
        'rightTop':'https://www.jz2025.com/static/wx/index/pic_pu@2x.png',
        'rightBottomLeft':'https://www.jz2025.com/static/wx/index/pic_xinpin@2x.png',
        'rightBottomRight':'https://www.jz2025.com/static/wx/index/pic_remen@2x.png',
      },
      'hotType':{
        'mx': 'https://www.jz2025.com/static/wx/index/pic_mingxing@2x.png',
        'dp': 'https://www.jz2025.com/static/wx/index/pic_dapai@2x.png',
        'wh': 'https://www.jz2025.com/static/wx/index/pic_weihuo@2x.png',
        'cx': 'https://www.jz2025.com/static/wx/index/pic_chaoxie@2x.png',
        'lx': 'https://www.jz2025.com/static/wx/index/pic_liangxie@2x.png',
        'tx': 'https://www.jz2025.com/static/wx/index/pic_tuoxie@2x.png',
      }
    },
    'hiddenmodalput':true,
    
  },
  onLoad: function (options){
    this._loadData();  
    var that=this;
    index.getShare((res) => {

      that.setData({
        ShareImg: res
      });
    });

  
  },
  _loadData: function (callback){
      var that = this;
      index.getHotData((data)=>{
         that.getImg(data);
      });
      
  },
  //按钮跳转
  addGoods:function(event){
    var goodsid = index.getDataSet(event,'id');
    wx.navigateTo({
      url: '../shop-details/shop-details?goodsid='+goodsid,
    })
  }, 
  alert: function (title,icon) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: 1000,
      mask: true
    })
  },
  //搜索框
  search: function (event){
    var search = event.detail.value;

     var data = JSON.stringify({'search': search });
    
    var that = this;
    this.toSearch(data,0);
    
    
  },
  //按钮选中
  bActive:function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({
      bottomActive:index
    })
    this.toUrl(index);
    
    
  },
  //图片分类选中
  bImg:function(e){
    var key = e.currentTarget.dataset.key, val = e.currentTarget.dataset.val,data,
      index = e.currentTarget.dataset.index, temp = e.currentTarget.dataset.temp;
    data = '{ "' + key + '" : "' + val + '" }';

    data = JSON.parse(data);
    data = JSON.stringify(data);
    this.toSearch(data,index,temp);
  },
  toUrl:function(index){
    var data;
    switch (index) {
      case 0:
        break;
      case "1":
        wx.navigateTo({
          url: '../show/show',
        })
        break;
      case "2":
        data = JSON.stringify({ 'order': 'createTime' });
        this.toSearch(data,1);
        break;
      case "3":
        data = JSON.stringify({ 'order': 'saleNum' });
        this.toSearch(data, 2);
        break;
      case 4:
        title = "我的"
        break;
    }
  },
  toSearch:function(data,index,temp){
    wx.navigateTo({
      url: '../search/search?index=' + index+'&data='+data+'&temp='+temp,
    })
  },/**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload');
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
    console.log(this.data.ShareImg);
    return {
      title: '最方便的进货小程序，一件起批，工厂直销，送货到店，30天退换，还可免费铺货',
      path: '/pages/index/index',
      imageUrl: imageUrl[0]
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
    
    this.setData({
      hotShops: shops
    });

  }

})