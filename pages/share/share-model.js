import { Base } from '../../utils/base.js';
class Share extends Base {
  constructor() {
    super();
  }

  getCode(callback) {
    var that = this;
    var param = {
      url: 'Users/getInvite.html',
      sCallback: function (data) {

        data = data.data;

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

  getInvite(callback){
    var that = this;
    var param = {
      url: 'invite/getInvite',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  getcode(callback){
    var that = this;
    var param = {
      url: 'users/getCode',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);

  }

  setCode(data,callback){
    var that = this;
    var param = {
      url: 'users/setCode',
      type: 'POST',
      data:data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

}

export { Share };