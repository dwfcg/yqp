import { Base } from '../../utils/base.js';
class Shop extends Base{
  constructor() {
    super();
  }

  cartsShow(callback){
    var that = this;
    var param={
      url: 'Shops/cartsShow',
      type: 'POST',

      sCallback: function (data) {

        let shops = data.data,path='';
        
        for (var item in shops) {
          path = shops[item].img;

          //匹配网址
          var n = path.search("[a-zA-z]+://[^\s]*");
          if (n == -1) {
            shops[item].img = 'https://www.jz2025.com/' + path + '300x300.jpeg';
          }

        }
       
        callback && callback(data);
      }
    };
    this.request(param);
  }

  isCheck(data,callback){
    var that = this;
    var param = {
      url: 'Shops/isCheck',
      data:data,
      
      type: 'POST',

      sCallback: function (data) {

        

        callback && callback(data);
      }
    };
    this.request(param);
  }

  updateNum(data,callback){
    var that = this;
    var param = {
      url: 'Shops/updateNum',
      data: data,

      type: 'POST',

      sCallback: function (data) {



        callback && callback(data);
      }
    };
    this.request(param);
  }

  goBuy(callback){
    var that = this;
    var param = {
      url: 'Orders/setOrders',
      type: 'POST',
      sCallback: function (data) {

        callback && callback(data);
      }
    };
    this.request(param);
  }

  addAddress(data,callback){
    var that = this;
    var param = {
      url: 'Shops/saveAddress',

      data:data,
      type: 'POST',

      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

}
export { Shop };