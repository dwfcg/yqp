import { Address } from 'address-model.js';
var address = new Address();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress();
  },
  getAddress:function(){
    let that = this;
    address.getAddress((data) => {
      console.log(data.data);
      that.setData({
        address: data.data
      });
    });
  },
  checkboxChange:function(e){
    let id = address.getDataSet(e,'id'),
      index = address.getDataSet(e,'index'),
      _address = this.data.address,
      check = _address[index].isDefault;
    address.isDefault(id,(data)=>{
      if (data.statuscode==0){
          this.getAddress();
        }
    }); 
  },
  //删除地址
  del:function(e){
    let id = address.getDataSet(e,'id');
    address.del(id,(data)=>{
      this.getAddress();
    });
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
    this.getAddress();
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
  toUpdate:function(isUpdate){
    wx.navigateTo({
      url: '../editAddress/editAddress?update=' + isUpdate,
    })
  },
  edit:function(e){
    let id = address.getDataSet(e, 'id');
    this.toUpdate("true&id="+id);
  },
  add:function(){
    this.toUpdate(false);
  }
})