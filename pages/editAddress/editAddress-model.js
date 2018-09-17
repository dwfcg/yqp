import { Base } from '../../utils/base.js';
class Editaddress extends Base {
  constructor() {
    super();
  }

  //新增
  addAress(data,callback){
    var that = this;
    var param = {
      url: 'Address/address',
      type: 'POST',
      data:data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //查询地址
  getAddress(id,callback) {
    var that = this;
    var param = {
      url: 'Address/getAddressById',
      type: 'POST',
      data: { addressId:id},
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}
export { Editaddress }