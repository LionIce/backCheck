const network = require('../../utils/network.js')
const util = require('../../utils/util.js')
import { $wuxDialog } from '../../components/wux'
const app = getApp()
var that = "";
Page({
  data: {
    userInfo: {},
    message : false,
    flag: false,
  },
  onLoad: function () {
   
    that = this;
    network.request("profile/init", {}, function (res) {
      if (res.authStatus == 1) {
        res.certification = '';
      } else {
        // console.log(res)
        res.certification = '/pages/certification/certification?user_Info=' + JSON.stringify(res);
      }
      wx.setStorage({
        key: "authStatus",
        data: res.authStatus
      })
      res.accountbalance = "/pages/accountbalance/accountbalance?acctBal=" + parseFloat(res.acctBal).toFixed(2);
      res.acctBal = "￥" + parseFloat(res.acctBal).toFixed(2);
      res.authStatus = util.authStatus(res.authStatus)
      that.setData({
        userInfo :res,
      })
    }, function () {

    })
  },
  makePhoneCall:()=>{
    $wuxDialog.open({
      title: '提示',
      content: "4000075800",
      buttons: [
        {
          text: "立即拨打",
          type: 'weui-dialog__btn_primary',
          onTap(e) {
            wx.makePhoneCall({
              phoneNumber: '4000075800' //仅为示例，并非真实的电话号码
            })
          },
        },
        {
          text: '不用了',
        },
      ],
    })
  },
  onMessage:()=>{
      wx.navigateTo({
        url: '../message/message',
      })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.onLoad();
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  b: function (e) {
    this.setData({ flag: true })
  },
  goCertification:function(){
    this.setData({ flag: true })
    wx.navigateTo({
      url: '../certification/certification?user_Info=' + JSON.stringify(that.data.userInfo) ,
    })
  }
})
