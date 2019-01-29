
var that = "";    //在请求数据时setData使用
const network = require('../../utils/network.js')
import { $wuxToptips } from '../../components/wux'
import WxValidate from '../../assets/plugins/WxValidate'

Page({
  data: {
    tplList: {},
    credit : "",
  },
  onLoad: function (options) {
    try {
      var creditBizMode = wx.getStorageSync('creditBizMode')
      this.setData({
        tplList: JSON.parse(options.tpl),
        credit: creditBizMode
      }) 
    } catch (e) {
      this.setData({
        tplList: JSON.parse(options.tpl),
      }) 
    }
  }, 
  sendAuthorized:function(){
    var params = {};
    for (var key in this.data.tplList.inputs){    
      params[this.data.tplList.inputs[key].ioCode] = this.data.tplList.inputs[key].value
    }
    params.tplId = this.data.tplList.tplId
    console.log(params)
    try {
      var creditBizMode = wx.getStorageSync('creditBizMode')
      if (creditBizMode == 1) {
        network.requestLoading("template/query_report", params, "", function (res) {
          wx.redirectTo({
            url: '../authorized/authorized',
          })
        }, function () {

        })
      } else {
        network.requestLoading("template/quick_query_report", params, "", function (res) {
          wx.redirectTo({
            url: '../authorized/authorized',
          })
        }, function () {

        })
      }
    } catch (e) {
     
    }
    
  
  }
})
