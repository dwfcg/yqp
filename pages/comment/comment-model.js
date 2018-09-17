import { Base } from '../../utils/base.js';

class Comment extends Base{
  constructor() {
    super();
  }

  uploadImg(img,callback){
    wx.uploadFile({
      url: this.baseRestUrl+'Comment/uploadImg',
      filePath:img,
      name:'file',
      header:{
        'token': wx.getStorageSync('token')
      },
      success:function(res){
       
        callback && callback(res);
      }
    });
  }

  //获取评论商品数据
  getGoods(orderNo,callback){
    var that = this;
    var param = {
      url: 'Comment/getGoods',
      type: 'POST',
      data: { orderNo: orderNo },
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }
  //提交商品评论
  addComment(comment,callback){
    var that = this;
    var param = {
      url: 'Comment/addComment',
      type: 'POST',
      data: comment,
      sCallback: function (data) {
        callback && callback(data);
      }
    };
    this.request(param);
  }

  
}
export { Comment };