import { Base } from '../../utils/base.js';
class AddGoods extends Base{
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

  
}

export { AddGoods }