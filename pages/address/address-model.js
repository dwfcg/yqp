import { Base } from '../../utils/base.js';
class Address extends Base{
  constructor() {
    super();
  }

  //删除
  del(id,callback){
    var that = this;
    var param = {
      url: 'Address/del',
      type: 'POST',
      data: { addressId: id },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //修改默认
  isDefault(id,callback){
    var that = this;
    var param = {
      url: 'Address/isDefault',
      type: 'POST',
      data: { addressId: id },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  //查询地址
  getAddress(callback){
    var that = this;
    var param = {
      url: 'Address/getAddress',
      type: 'POST',
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
}
export { Address }