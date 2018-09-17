import { Editaddress } from 'editAddress-model.js';
var editaddress = new Editaddress();
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
    let isUpdate = options.update,
        that = this;
    this.setData({
      isUpdate: isUpdate,
      id: options.id
    });
    if (isUpdate=='true'){
      this.setTitle("修改地址");
      editaddress.getAddress(options.id,(data)=>{
        console.log(data);
        that.setData({
          address: data.data
        });
        
      });
      return;
    }
    this.setTitle('新增地址');
  },
  //输入框
  userName: function (e) {
    this.data.userName = e.detail.value;
  },
  userPhone: function (e) {
    this.data.userPhone = e.detail.value;
  },
  userAddress: function (e) {
    this.data.userAddress = e.detail.value;
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
  //修改标题
  setTitle:function(title){
    wx.setNavigationBarTitle({
      title: title
    })
  },
  add:function(){

    let isUpdate = this.data.isUpdate,
        data={},msg="";
      
    if (isUpdate == 'true'){//修改
      data = { addressId:this.data.id, userName: this.data.userName, userPhone: this.data.userPhone, userAddress: this.data.userAddress };
      msg = "修改成功";

    }else{
      data = { userName: this.data.userName, userPhone: this.data.userPhone, userAddress: this.data.userAddress };
      msg = "新增成功";
    }
    
    editaddress.addAress(data,(data)=>{
      if (data.statuscode==0){
        wx.showToast({
          title: msg,
          icon: 'success',
          duration: 1000,
          mask: true
          
        })
        wx.navigateBack();
      }else{
        wx.showToast({
          title: '出错',
          icon: 'loading',
          duration: 1000,
          mask: true
        })
      }
      
    });


  }
})