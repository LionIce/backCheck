
Page({
  data: {
    credit : ""
  },
  onLoad: function (options) {
    try {
      var creditBizMode = wx.getStorageSync('creditBizMode')
      this.setData({
        credit: creditBizMode
      })
    } catch (e) {
      
    }
  }, 
  confirm:()=>{
    wx.switchTab({
      url: '../report/report',
      success: () => {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  }
})
