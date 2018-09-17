import { Base } from '../../utils/base.js';
class Search extends Base {
 
  constructor() {
    "use strict";
    super();                                                                                                                                  
  }
  searchData(options,callback){
    var that = this;
    let data = JSON.parse(options.data);
   //console.log(data);
    wx.setStorageSync('search', data);
   
    var param = {
      url: 'Goods/searchByFoot',
      data: data,
      sCallback: function (data) {
        console.log(data);
        data = data.data;
        
        callback && callback(data);
      }
    };
    this.request(param);
  }

  searchDataByPage(page, callback){
    let url=this.setParam(page);
    var param = {
      url: 'Goods/searchByFoot?'+url,
      sCallback: function (data) {
        console.log(data);
        data = data.data;

        callback && callback(data);
      }
    };
    this.request(param);
  }

  searchDataByOrder(Order,callback) {
    var that = this;
    
    let data=wx.getStorageSync('search', data),str='';
    let temp =true;
    for (var p in data) {
      if(p=='order'){
        data[p] = Order;
        temp=false;
      }
      str += p + '=' + data[p];
      str += '&';
    }
    if(temp){
      str += "order=" + Order+"&";
    }
    str+="page="+1;
    var param = {
      url: 'Goods/searchByFoot?'+str,
      sCallback: function (data) {
        console.log(data);
        data = data.data;

        callback && callback(data);
      }
    };
    this.request(param);
  }
  //组合数据
  setParam(page){
    //读取缓存
   let data= wx.getStorageSync('search'),str='';
    for (var p in data) {
      str += p + '=' + data[p];
      str+='&';
      
    }
    str+="page="+page;
    return str;
  }
  


}
export { Search };