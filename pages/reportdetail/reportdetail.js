const network = require('../../utils/network.js')
var that = ""; 
const util = require('../../utils/util.js')

Page({
  data: {
      report :{},
      arrow : {},
  }, 
  onLoad: function (options) {
    that = this;
    var param = new Object();
    param.reportId = options.id
    network.requestLoading("template/report_info", param, "",function (res) {     
      res.reportInfo.createTime = util.formatTime(new Date(res.reportInfo.createTime))
      res.creditReportDigest.birthday = util.formatTimeDay(new Date(res.creditReportDigest.birthday))
      that.setData({
          report  : res
      })
    }, function () {

    })  
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
