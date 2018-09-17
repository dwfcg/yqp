import { Base } from '../../utils/base.js';
class Gobuy extends Base{
  constructor() {
    super();
  }

  setOrders(data,callback){
    var that = this;
 
    var param = {
      url: 'Orders/setOrders',
      type: 'POST',
      data:data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  //查询地址
  getAddress(callback) {
    var that = this;
    var param = {
      url: 'Address/getAddressdefault',
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  
}

export { Gobuy }