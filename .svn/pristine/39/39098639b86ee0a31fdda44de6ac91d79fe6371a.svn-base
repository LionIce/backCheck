const network = require('../../utils/network.js')
 var that = ""; 

Page({
  data: {
      arrow : {},
  }, 
  onLoad: function (options) {
    that = this
  },
  upArrow:function(e){
    var id = e.currentTarget.dataset.id;
    var dataItem = that.data.arrow;
    if (dataItem[id] != null && dataItem[id] != "" && dataItem[id]){
      dataItem[id] = false
      that.setData({
        arrow : dataItem
      })
    }else{
      dataItem[id] = true
      that.setData({
        arrow : dataItem
      })
    }
    
  }
})
