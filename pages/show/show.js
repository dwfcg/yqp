// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bottomActive: 1,//底部菜单选中判断
  },

  bImg: function (e) {
    var key = e.currentTarget.dataset.key, val = e.currentTarget.dataset.val, data,
      index = e.currentTarget.dataset.index, temp = e.currentTarget.dataset.temp;
    data = '{ "' + key + '" : "' + val + '" }';

    data = JSON.parse(data);
    data = JSON.stringify(data);
    this.toSearch(data, index);
  }, 
  toSearch: function (data, temp) {
    wx.navigateTo({
      url: '../search/search?temp=' + temp + '&data=' + data,
    })
  },
  bActive: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      bottomActive: index
    })
    this.toUrl(index);


  },
  toUrl: function (index) {
    var data;
    switch (index) {
      case "0":
        wx.navigateTo({
          url: '../index/index',
        })
        break;
      case "1":
        wx.navigateTo({
          url: '../show/show',
        })
        break;
      case "2":
        data = JSON.stringify({ 'order': 'createTime' });
        this.toSearch(data, 1);
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
})