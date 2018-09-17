/**
 * Created by jimmy-jiang on 2016/11/21.
 */
import { Token } from 'token.js';
import { Config } from 'config.js';

class Base {
  constructor() {
    "use strict";
    this.baseRestUrl = Config.restUrl;
    this.onPay = Config.onPay;
  }

  //http 请求类, 当noRefech为true时，不做未授权重试机制
  request(params, noRefetch) {
    var that = this,
      url = this.baseRestUrl + params.url;
     
    if (!params.type) {
      params.type = 'get';
    }
    /*不需要再次组装地址*/
    if (params.setUpUrl == false) {
      url = params.url;
    }
    //console.log(url + "|" + params.data + "|" + params.type);
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        //console.log(res);
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
        } else {
          if (code == '401') {
            if (!noRefetch) {
              that._refetch(params);
            }
          }
          that._processError(res);
          params.eCallback && params.eCallback(res.data);
        }
      },
      fail: function (err) {
        //wx.hideNavigationBarLoading();
        that._processError(err);
        // params.eCallback && params.eCallback(err);
      }
    });
  }

  _processError(err) {
    console.log(err);
  }

  _refetch(param) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(param, true);
    });
  }

  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  };

  //更改订单状态
  updateOrders(orderNo, callback) {
    var that = this;
    var param = {
      url: 'Orders/payAfter',
      type: 'POST',
      data: { orderNo: orderNo},
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //查询店铺商品
  getGoodsByShop(shopId,callback){
    var that = this;
    var param = {
      url: 'Orders/payAfter',
      type: 'POST',
      data: { shopId: shopId },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }


  //支付
  pay(orderNo,callback) {
    //支付调起
    var that = this;
    wx.request({
      url: this.baseRestUrl+'Shops/pay',//支付地址
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'token': wx.getStorageSync('token')
      },
      data: { orderNo: orderNo },
      method: 'POST',
      success: function (res) {
        console.log('调起支付');
        console.log(res);
        if (res.data.statuscode == 0){
          wx.showToast({
            title:'额度支付成功',
            icon: 'success',
            duration: 3000
          });
          callback && callback(true);
          return ;
        }
        wx.requestPayment({
          'timeStamp': res.data.timeStamp,
          'nonceStr': res.data.nonceStr,
          'package': res.data.package,
          'signType': 'MD5',
          'paySign': res.data.paySign,
          'success': function (res) {
            
            wx.showToast({
              title: '支付成功',
              icon: 'success',
              duration: 3000
            });
            
            //更改订单状态
            that.updateOrders(orderNo,(data)=>{
              console.log(data);
            });
            callback && callback(true);
          },
          'fail': function (res) {
            console.log(res.data.data)
            
          },
          'complete': function (res) {
            
          }
        });
      },
      fail: function (res) {
        console.log(res.data)
      }
    });
  }


  
};

export { Base };
