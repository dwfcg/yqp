import { Base } from '../../utils/base.js';

class User extends Base{
  constructor() {
    super();
  }

  //获取推荐
  getHotData(page, callback) {
    var that = this;


    var param = {
      url: 'Goods/getFootBySaleNum.html?page=' + page,
      sCallback: function (data) {

        data = data.data;

        callback && callback(data);
      }
    };
    this.request(param);
  }

  //获取订单信息
  getOrders(callback){
    var that = this;


    var param = {
      url: 'shops/getOrdersCount',
      sCallback: function (data) {
      
        callback && callback(data);
      }
    };
    this.request(param);
  }

  getShare(callback) {
    var that = this;


    var param = {
      url: 'index/getShare',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //设置用户名
  setName(data,callback){
    var that = this;
    var param = {
      url: 'shops/setName',
      type:'POST',
      data:data,
      sCallback: function (data) {
        data = data.data;
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //是否通过审核
  isApply( callback) {
    var that = this;
    var param = {
      url: 'Apply/isApply',
      type: 'POST',
      
      sCallback: function (data) {
       
        callback && callback(data);
      }
    };
    this.request(param);
  }
  //判断是否认证
  UserIsApply(callback){
    var that = this;
    var param = {
      url: 'Apply/UserIsApply',
      type: 'POST',

      sCallback: function (data) {

        callback && callback(data);
      }
    };
    this.request(param);
  }

  isInvite(callback){
    var that = this;
    var param = {
      url: 'Invite/isInvite',
      type: 'POST',

      sCallback: function (data) {

        callback && callback(data);
      }
    };
    this.request(param);
  }
  setInvite(code, callback) {
    var that = this;


    var param = {
      url: 'Users/setInvite',
      type: 'POST',
      data: { code: code },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  setCode(data,callback){
    var that = this;
    var param = {
      url: 'Users/setCode',
      type: 'POST',
      data: data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  getCode(callback){
    var that = this;
    var param = {
      url: 'Users/getCode',
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  getCount(callback){
    var that = this;
    var param = {
      url: 'Users/getCountShop',
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  getFree(callback){
    var that = this;
    var param = {
      url: 'Shops/getFreeInfo',
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

}
export { User }