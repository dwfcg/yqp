// pages/filter/filter.js
var app = getApp
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  
    curNav: 1,
    curIndex: 0,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    showView: true  ,
    cats:[],
    showSon:[],//是否显示子菜单
    catName:[],//选中子类型展示
    getCats:0,
    aCats:[],
    key:[],
    val:[],
    parentId:[],//存放父类ID
    search:'',
    order:'',
    catType:[]
    
  },
  
  switchRightTab: function (e) {
    var that = this; 
    // 获取item项的id，和数组的下标值  
    var id = e.target.dataset.id,
      index = parseInt(e.target.dataset.index);
      let showSon=[];
      showSon=this.data.showSon;
      
      showSon[index] = showSon[index]==1?0:1;
      this.setData({
        showSon:showSon
      })
     
    
   
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this, data = JSON.parse(options.data);
    //存储筛选条件
    this.setData({
      search:data.search,
      key:data.key,
      val:data.val,
      order:data.order
    })
    
    var cats = wx.getStorageSync('cats'), parentId = wx.getStorageSync('parentId'), catType = wx.getStorageSync('catType');
    console.log(cats);
    if (!cats){
      this.getCats();
    }else{
      this.setData({
        cats: cats,
        parentId: parentId,
        catType: catType
      })
    }
    


    /** 
     * 获取系统信息 
     */
    
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  //获取分类数据
  getCats:function(){
    var that = this;

    
    wx.request({
      url: 'https://www.jz2025.com/api/Goods/getFootCats',
      data: { 'parentId': 570 },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      method: 'POST',
      success: function (res) {
        var data = res.data.data;
        let parentId = [], catType=[];
        for(let i=0;i<data.length;i++){
          parentId[i]=data[i].catId;
          catType[data[i].catId] = data[i].type;
          that.getCatSon(data[i].catId,i);
        }
        
        try {
          
          wx.setStorageSync('parentId', parentId);
          wx.setStorageSync('catType', catType);
        } catch (e) {
        }
        that.setData({
          cats: data,
          parentId: parentId,
          catType: catType
        })
       // console.log(that.data.cats);       
      }
    })
  },
  //获取子分类
  getCatSon:function(id,index){
    var that = this;
    wx.request({
      url: 'https://www.jz2025.com/api/Goods/getFootCats',
      data: { 'parentId': id },
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      method: 'POST',
      success: function (res) {
        var son = 'cats['+index+'].son'
        
        that.setData({
          [son]: res.data.data
        })
        wx.setStorageSync('cats', that.data.cats);
      }
    })
  },
  activeCats:function(e){
    let id = e.target.dataset.id, name = e.target.dataset.name,
      type = e.target.dataset.type, parent = e.target.dataset.parent;
    let catName = [], aCats = [], arrCats=[];
      catName=this.data.catName;
      aCats = this.data.aCats;
      catName[parent] = aCats[parent] ==id?'':name;
      
      aCats[parent] = aCats[parent]==id?0:id;

      
     
     
      
      
      this.setData({
        catName:catName,
        aCats: aCats,
       
      })
     
  },
  sure:function(){
    let catType = this.data.catType,
      aCats = this.data.aCats,
      parentId = this.data.parentId;

    let data='{';
      for(let i=0;i<parentId.length;i++){
        if (aCats[parentId[i]]>0){
          data +='"'+ catType[parentId[i]] + '" : "'  + aCats[parentId[i]]+'",';
          
          }
      }
      data += '"temp":"false" }';
      console.log(data);
      data = JSON.parse(data);
      data = JSON.stringify(data);

      console.log(data);
      wx.redirectTo({
        url: '../search/search?temp=36&data=' + data,
      })
      
  }
})