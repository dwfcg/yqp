import {Home} from './home-model.js';
var home = new Home();

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    currentTab: 0,
    text:[
      {text:'定制',num:0},
      { text: '现货', num: 1},
      { text: '热门', num: 2},
      { text: '新品', num: 3},
      
    ],
    title: ['搜索', '新品', '热门', '大牌潮款', '明星同款', '真皮女鞋馆', '早秋单鞋', '超纤馆', 'PU女鞋馆', '精品短靴', '新品发售', '拖鞋', '凉鞋', '单鞋', '高帮鞋', '帆布鞋', '裸靴', '短靴', '中筒靴', '过膝靴', '欧美风', '复古风', '休闲风', '韩版', '潮流运动鞋', '经典小白鞋', '舒适平底鞋', '时尚高跟鞋', '头层牛皮', '牛反绒', '羊皮', '羊反绒', '超纤', 'PU', '网布', '漆皮', '筛选'],
  },

  onLoad: function (options) {
    options.index=1;
    this.setTitle(options.index);//设置标题
    this.setData({
      myoptions: options
    })
    this._loadData(options);  
  },
  _loadData: function (options) {
    var that = this;
    home.searchData(options, (data) => {
      if (data.data.length == 0) {
        wx.showToast({
          title: '没有该类数据',
          icon: 'loading',
          duration: 1000,
          mask: true
        })
      }
      that.getImg(data.data);
      that.setData({

        last_page: data.last_page,
        current_page: data.current_page,
      })
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
      home.searchDataByPage(page, (data) => {
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

  //菜单选中事件
  meunActive: function (e) {


    var active = e.currentTarget.dataset.index,
      that = this,
      data = '', order = '', catShow,
      search = this.data.search;



    that.setData({
      active: active,

    })
    switch (active) {
      case 0:
        order = 'goodsId';
        break;
      case 1:
        order = 'saleNum';

        break;
      case 2:
        order = 'createTime';
        break;
      case 3:
        let data = { search: this.data.search, order: this.data.order, key: this.data.key, val: this.data.val }
        wx.redirectTo({
          url: '../filter/filter?data=' + JSON.stringify(data),
        })
        return false;
        return false;
      default:

    }
    that.setData({
      catActive: 5,
      catShow: 0,

    })
    this.meunOrder(order);


  },
  meunOrder: function (order) {
    var that = this;
    home.searchDataByOrder(order, (data) => {
      let shops = this.data.shops;
      shops = shops.concat(data.data);
      that.getImg(shops);
      that.setData({

        last_page: data.last_page,
        current_page: data.current_page,
      })
    });
  },
  catActive: function (e) {
    var id = e.currentTarget.dataset.id,
      index = e.currentTarget.dataset.index,
      data;
    data = { 'search': this.data.search, 'order': 'goodsId', 'key': ['goodsCategory', this.data.key], 'val': [id, this.data.val] };
    this.getData(data);
    this.setData({
      catActive: index
    })
  },
  getData: function (data) {
    var that = this;
    wx.request({
      url: 'https://www.jz2025.com/api/Goods/searchByFoot',
      data: data,
      method: 'POST',
      success: function (res) {
        var res = res.data.data,
          data = res.data;


        if (!data.length) {
          that.alert('没有该类数据', 'loading');
          return false;
        }

        that.setData({
          shops: data,
        })


      }
    })

  },
  
  clickTab: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {

      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  //取货源类别
  getType: function () {
    var that = this;
    wx.request({
      url: 'https://www.jz2025.com/api/Goods/getFootCats',
      data: { 'parentId': 764 },
      method: 'POST',
      success: function (res) {
        var res = res.data.data,
          data = res;

        that.setData({
          goodsCategory: data
        })
      }
    })
  },
  //提示
  alert: function (title, icon) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: 1000,
      mask: true
    })
  },
  //生成页面标题
  setTitle: function (title) {
    let data = this.data.title;
    title = data[title];
    wx.setNavigationBarTitle({
      title: title
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
})
