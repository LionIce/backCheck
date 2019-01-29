//logs.js
const util = require('../../utils/util.js')
const network = require('../../utils/network.js')
var pageNo = 1;
var that = "";
Page({
  data: {
    hidden : false,
    items : [],
  },
  onLoad: function () {
    that = this;
    that.initData();
  },
  onclickempty:()=>{
    that.initData();
  },
  initData:()=>{
    var param = new Object();
    param.pageNo = pageNo
    param.pageSize = "10"
    param.transType = "2"
    network.requestLoading("account/trans_list", param, "",function (res) {
      if (res.length > 0) {
        for (var i = 0; i < res.length; i++) {
          res[i].transAmt = res[i].transAmt.toFixed(2)
          res[i].transCreateTime = util.formatTime(new Date(res[i].transCreateTime))
        }
        that.setData({
          items: res
        })
      } else {
        that.setData({
          hidden: true,
        })
      }

    }, function () {

    })
  },
   //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log("下拉刷新");
    pageNo = 1;
    this.initData();
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  onReachBottom: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    pageNo++;
    var param = new Object();
    param.pageNo = pageNo
    param.pageSize = "10"
    param.transType = "2"
    network.requestLoading("account/trans_list", param, "", function (res) {
      if (res.length > 0) {
        for (var i = 0; i < res.length; i++) {
          res[i].transAmt = res[i].transAmt.toFixed(2)
          res[i].transCreateTime = util.formatTime(new Date(res[i].transCreateTime))
        }
        that.setData({
          items: that.data.items.concat(res)
        })
      }
    }, function () {

    })
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载

    }, 1500);
  }
})
