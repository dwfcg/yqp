// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头

import { Config } from 'config.js';

class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'wxtoken/verifyToken';
    this.tokenUrl = Config.restUrl + 'wxtoken/loginByWx';
  }

  verify() {
    var token = wx.getStorageSync('token');
    console.log(token);
    if (!token) {
      this.getTokenFromServer();
    }
    else {
      this._veirfyFromServer(token);
    }
  }

  _veirfyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: function (res) {
        var valid = res.data.isValid;
        if (!valid) {
          that.getTokenFromServer();
        }
      }
    })
  }

  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res.code);
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (res) {
            // console.log(res);
            wx.setStorageSync('token', res.data.data.token);
            wx.setStorageSync('isNew', res.data.data.isNew);
             console.log(wx.getStorageSync(token)) ;
            callBack && callBack(res.data.data);
          }
        })
      }
    })
  }
}

export { Token };