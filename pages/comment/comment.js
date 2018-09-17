import { Comment } from 'comment-model.js';
var comment = new Comment();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    num:15,
    comment:'',
    imgs:[],
    uploadImg:[],
    hide:0,
    goodsIndex:0,
    
    tag:[
      {title:'价格实惠',num:0},
      { title: '质量好', num: 0 },
      { title: '物流快', num: 0 },
      { title: '服务好', num: 0 },
    ],
    newTag:[],//向后台提交的tag
   
  },
  bindPickerChange: function (e) {
    this.setData({
      goodsIndex: e.detail.value
    })
  }  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    //接收订单编号
    console.log(options);
    let orderNo = options.orderNo;
    
    //获取商品数据
    comment.getGoods(orderNo,(data)=>{
      var data = data.data;
      console.log(data);
      that.setData({
        goods:data,
        orderNo: orderNo
      });
      
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
  comment:function(e){
    let comment = e.detail.value; 
    this.data.comment = comment;

  },
  bindTextAreaBlur: function (e){
    if (this.data.comment.length==0){
      this.setData({
        isShow: false
      });
    }
   
  },
  bindTextAreaFocus:function(){

    this.setData({
      isShow:true
    });
  },
  //上传图片
  updateImg:function(){
    var that = this;
    wx.chooseImage({
      count: 6, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        that.editImg(tempFilePaths)
      
        console.log(tempFilePaths);
        //upload(that, tempFilePaths);
      }
    })
  },
  editImg:function(newImg){
    let imgs = this.data.imgs,
      num = imgs.length + newImg.length;
        if (num>6){
          wx.showToast({
            title: '限6张',
            icon: 'loading',
            duration: 1000,
            mask: true
          })
        }else{
          console.log(newImg);
          //上传图片
          let count = newImg.length,
              img_count = this.data.imgs.length;
          for(let i=0;i<count;i++){
            comment.uploadImg(newImg[i], (res) => {
             
              let _res = JSON.parse(res.data);
              let code = _res.statuscode,
                  img = _res.data;
                  console.log(img);
                if(code==0){
                 //更新图片数据
                  let Img = this.data.imgs.concat(img);
                  console.log(Img);
                  this.setData({
                    imgs: Img
                  });
                  return;
                }
                //失败提示
                wx.showToast({
                  title: i+"张图片上传失败",
                  icon: 'loading',
                  duration: 1000,
                  mask: true
                })
             
            });
          }
         
          
        }
       


  },
  //删除图片
  delImg:function(e){
    let index = comment.getDataSet(e,'index'),
        imgs = this.data.imgs,
        that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除本张图片',
      success: function (res) {
        if (res.confirm) {
          //删除图片
          imgs.splice(index, 1);
          that.setData({
            imgs:imgs
          });
          console.log(imgs);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })  
  },
  //提交评论
  goComment:function(){
    let index = this.data.goodsIndex,
        goods = this.data.goods[index],
        imgs = this.data.imgs,
        _comment = this.data.comment,
        num = _comment.length,
    tags = this.data.newTag;
        imgs = imgs.join(",");
        if(num < 15 || num == undefined){
          wx.showToast({
            title: "评论最少15字",
            icon: 'loading',
            duration: 1000,
            mask: true
          })
          return;
        }
        let data = { orderNo: this.data.orderNo,shopId: goods.shopId, goodsId: goods.goodsId, orderId: goods.id, goodsSpecId: goods.goodsSpecId, content: _comment, images:imgs,tag:tags};
        
        comment.addComment(data,(data)=>{
         
          if (data.statuscode==0){
            wx.navigateBack();
          }
        });
       
    
  },
  //提交标签
  setTag:function(e){
    let index=comment.getDataSet(e, 'index'),
        tags = this.data.tag,
        newTag=[];
        //tags转化为数组
        for(let i=0;i<tags.length;i++){
          if(i == index){//选中标签
            newTag[i] = tags[i].num == 0 ? ++tags[i].num : --tags[i].num;
            continue;
          }
          newTag[i]=tags[i].num;
        };
        tags[index].num=newTag[index];
        this.setData({
          tag:tags,
          newTag: newTag
        });
        

  }

})