import { Base } from '../../utils/base.js';
class ShopDetails extends Base{
  constructor(){
    super();
  }

  getShopDetails(goodsId,callback){
    var that = this;
    var param = {
      url: 'Shops/getShopDetails',
      type: 'POST',
      data:{'goodsId':goodsId},
      sCallback: function (data) {

      // console.log(data);

        callback && callback(data);
      }
    };
    this.request(param);
  }
}
export { ShopDetails };