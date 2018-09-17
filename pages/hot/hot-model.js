import { Base } from '../../utils/base.js';
class Hot extends Base{
  constructor() {
    super();
  }

  getHotData(page,callback){
    var that = this;


    var param = {
      url: 'Goods/getFootBySaleNum.html?page='+page,
      sCallback: function (data) {
        
        data = data.data;

        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export { Hot };