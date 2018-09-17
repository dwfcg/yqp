import { Base } from '../../utils/base.js';
class Sample extends Base {
  constructor() {
    super();
  }
  getsample(callback)
  {
      var that=this;
      var param={
        url:'v1/orders/getsample',
        type:'POST',
        sCallback:function(data){
            // console.log(data);
          callback && callback(data);
        }
      };
      this.request(param);
  }
  getsamplemoney(callback) {
    var that = this;
    var param = {
      url: 'v1/orders/getsamplemoney',
      type: 'POST',
      sCallback: function (data) {
        // console.log(data);
        callback && callback(data);
      }
    };
    this.request(param);
  }
  getsamplerefound(callback) {
    var that = this;
    var param = {
      url: 'v1/orders/getsamplerefound',
      type: 'POST',
      sCallback: function (data) {
        // console.log(data);
        callback && callback(data);
      }
    };
    this.request(param);
  }


}
export { Sample}