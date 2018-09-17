import {Base} from '../../utils/base.js';
class Shopcertification extends Base{
  constructor(){
    super();
  }

  uploadImg(img, callback) {
    wx.uploadFile({
      url: this.baseRestUrl + 'Apply/uploadApplyImg',
      filePath: img,
      name: 'file',
      header: {
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        callback && callback(res);
      }
    });
  }

  apply(data, callback) {
    var that = this;
    var param = {
      url: 'Apply/Apply',
      type: 'POST',
      data: data,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

}
export { Shopcertification}