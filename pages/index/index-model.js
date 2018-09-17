import { Base } from '../../utils/base.js';

class Index extends Base {
  constructor() {
    super();
  }
  
  /*今日热门信息*/
  getHotData(callback) {
    var that = this;
    var param = {
      url: 'Goods/getFootList',
      data: { 'currentPage': 20, 'keyword': 'saleNum' },
      type:'POST',
    
      sCallback: function (data) {

        data = data.data.data;
       
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

  
}
export { Index };