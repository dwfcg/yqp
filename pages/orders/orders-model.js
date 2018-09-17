import { Base } from '../../utils/base.js';
class Orders extends Base{
  constructor(){
    super();
  }

  //获取订单数据
  getOrders(current,callback){
    var that= this;
    var param = {
      url: 'Shops/getOrders',
      type: 'POST',
      data: { current: current},
      sCallback: function (data) {

        var shops = data.data,
          path = '';
        for (var item in shops) {
          var orders = shops[item].ordergoods;
          for (var _item in orders){
             
              path = orders[_item].goodsImg;
              var n = path.search("[a-zA-z]+://[^\s]*");
              if (n == -1) {
                orders[_item].goodsImg = 'https://www.jz2025.com/' + path + '300x300.jpeg';
              }
            }
      
         
          //匹配网址
         

        }
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //取消订单
  delOrders(orderNo,callback){
    var that = this;
    var param = {
      url: 'Shops/delOrders',
      type: 'POST',
      data: { orderNo: orderNo },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  getShop(orderNo, callback){
    var that = this;
    var param = {
      url: 'Orders/getShop',
      type: 'POST',
      data: { orderNo: orderNo },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}
export { Orders }