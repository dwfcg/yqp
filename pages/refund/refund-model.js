import {Base} from '../../utils/base.js';
class Refund extends Base{
  constructor(){
    super();
  }

  //查看订单信息
  getOrder(orderNo,callback){
    var that = this;
    var param = {
      url: 'Refund/getGoods',
      type: 'POST',
      data: { orderNo: orderNo },
      sCallback: function (data) {
        var shops = data.data,
          path = '';
       
          var orders = shops.ordergoods;
          for (var _item in orders) {

            path = orders[_item].goodsImg;
            var n = path.search("[a-zA-z]+://[^\s]*");
            if (n == -1) {
              orders[_item].goodsImg = 'https://www.jz2025.com/' + path + '300x300.jpeg';
            }
          }


          //匹配网址



        callback && callback(data);
      }
    };
    this.request(param);
  };


  refund(data,callback){
    var that = this;
    var param = {
      url: 'Refund/refund',
      type: 'POST',
      data:data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}
export { Refund }