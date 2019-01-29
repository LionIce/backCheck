const network = require('../../utils/network.js')
var that = "";
Page({
  data: {
    certification : {}
  },
  onLoad: function (options) {
    that = this
    this.setData({
      certification: JSON.parse(options.user_Info),
    }) 
  },
  personal:()=>{
      wx.navigateTo({
        url: '../personalcer/personalcer',
      })
  },
  enterprise:()=>{
    wx.navigateTo({
      url: '../enterprise/enterprise',
    })
  }

})
