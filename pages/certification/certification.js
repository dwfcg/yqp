import { Certification } from './certification-model.js';
var cer = new Certification();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input:{
      isShop:0,
    },
    img:{
      zm:'../../ios/img_yuanjian@2x.png',
      fm:'../../ios/img_yuanjian@2x.png',
      sc:'../../ios/img_shouchi@2x.png'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  //获取input值
  getInput:function(e){
    let key = cer.getDataSet(e,'name'),
      value = e.detail.value,
      input = this.data.input;
      input[key]=value;
      this.setData({
        input:input
      });
      
  },
  //上传图片
  updateImg: function (e) {

    var that = this,
      name = cer.getDataSet(e,'name'),
      img = this.data.img;
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        //that.editImg(tempFilePaths)
        cer.uploadImg(tempFilePaths[0], (data)=>{
            img[name]=data.data;
            that.setData({
              img:img
            });
          
        });
        
        //upload(that, tempFilePaths);
      }
    })
  },
  //提交数据
  getNext:function(){
    //组合文字和图片数据
    let input = this.data.input,
        img = this.data.img;
    input['frontphoto']=img['zm'];
    input['backphoto'] = img['fm'];
    input['scphoto'] = img['sc'];
        cer.apply(input,(res)=>{
          if (res.statuscode==-1){//验证数据未通过
            wx.showToast({
              title: res.message,
              icon: 'loading',
              duration: 1000,
              mask: true
            })
            return false;
          }
          //跳转到店铺认证
          wx.navigateTo({
            url: '../shopcertification/shopcertification',
          })
        });
       
  }
})