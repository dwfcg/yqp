import { Base } from '../../utils/base.js';
class New extends Base{
  constructor() {
    super();
  }

  getNewData(page,callback){
    var that = this;
    

    var param = {
      url: 'Goods/getFootByTime.html?page='+page,
      sCallback: function (data) {
        
        data = data.data;

        callback && callback(data);
      }
    };
    this.request(param);
  }
}

export { New };