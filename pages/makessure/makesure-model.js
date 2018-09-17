import { Base } from '../../utils/base.js';
class MakeSure extends Base {
  constructor() {
    super();
  }
  getOrder(orderNo,callback){
    var  that=this;
    var param = {
      url: 'v1/orders/getorder',
      type: 'POST',
      data: { orderNo: orderNo},
      sCallback: function (data) {
        // console.log(data);
        callback && callback(data);
      }
    };
    this.request(param);
  }
  editOrder(data, callback) {
    var that = this;
    var param = {
      url: 'v1/orders/editOrder',
      type: 'POST',
      data:data,
      sCallback: function (data) {
        // console.log(data);
        callback && callback(data);
      }
    };
    this.request(param);
  }
}
export { MakeSure }