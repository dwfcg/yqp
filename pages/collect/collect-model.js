import { Base } from '../../utils/base.js';
class Collect extends Base{
  constructor() {
    super();
  }

  getCollect(page,callback){
    var that = this;
    var param = {
      url: 'Shops/getCollectByGoods?page='+page,
      type: 'POST',

      sCallback: function (data) {
      
        data = data.data;

        callback && callback(data);
      }
    };
    this.request(param);
  }
}
export { Collect };