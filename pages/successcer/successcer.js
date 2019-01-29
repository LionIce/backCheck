
Page({
  data: {
  },
  confirm:()=>{
    wx.switchTab({
      url: '../my/my',
      success: () => {
        var page = getCurrentPages().pop();
        console.log("page", page)
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    })
  }
})
