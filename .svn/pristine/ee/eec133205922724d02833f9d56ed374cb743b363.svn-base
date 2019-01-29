const util = require('../../utils/util.js')
const network = require('../../utils/network.js')
import { $wuxDialog } from '../../components/wux'
var app = getApp();
var that = "";    //在请求数据时setData使用

Page({
  data: {
    tplList: [],
  },
   onLoad: function () {
     that = this;
     network.request("template/list",{}, function (res) {
       var list = res.tplList;
       for(var i =0 ;i < list.length;i++){
          if (list[i].displayMode == 1){
            var str = list[i].customSummary;
            var itemName = [];
            if (str.split(";").length > 1) {
              list[i].childrenTemplate = str.split(";")[0]
              for (var j = 0; j < str.split(";")[1].split(",").length; j++) {             
                itemName = itemName.concat(str.split(";")[1].split(",")[j])
              } 
            }else{
              for (var k = 0; k < str.split(",").length; k++) {
                itemName = itemName.concat(str.split(",")[k]);
              }
            }
            list[i].items = itemName
          }
        
       }
       that.setData({
         tplList: res.tplList,
        
       })
       wx.setStorage({
         key: "creditBizMode",
         data: res.creditBizMode
       })
     }, function () {

     })
   },
   quickselect:()=>{
     var authStatus;
     try {
       authStatus = wx.getStorageSync('authStatus')
       console.log(authStatus)
       if (authStatus == 0) {
         that.wuxDialog("您尚未进行实名认证,请认证", "立即认证")
         return 
       } else if (authStatus == 1) {
         that.wuxDialog("实名认证待审核, 请耐心等待", "确定")
         return
       } else if (authStatus == 2) {
         wx.navigateTo({
           url: '../quickselect/quickselect?current=0',
         })
       } else if (authStatus == 3) {
         that.wuxDialog("实名认证审核失败","重新提交")
         return "认证失败";
       }
     } catch (e) {

     }
   }, 
   sampleReport:()=>{
     wx.navigateTo({
       url: '../samplereport/samplereport',
     })
   },
   recharge:()=>{
     wx.navigateTo({
       url: '../recharge/recharge',
     })
   },
   onClickItem :(e)=>{
      // {
      //   "pagePath": "pages/find/find",
      //   "iconPath": "assets/images/icon_search.png",
      //   "selectedIconPath": "assets/images/icon_search_checked.png",
      //   "text": "查询"
      // },
     var authStatus;
     try {
       authStatus = wx.getStorageSync('authStatus')
       console.log(authStatus)
       if (authStatus == 0) {
         that.wuxDialog("您尚未进行实名认证,请认证", "立即认证")
         return
       } else if (authStatus == 1) {
         that.wuxDialog("实名认证待审核, 请耐心等待", "确定")
         return
       } else if (authStatus == 2) {
         wx.navigateTo({
           url: '../quickselect/quickselect?current=' + e.currentTarget.dataset.id,
         })
         return
       } else if (authStatus == 3) {
         that.wuxDialog("实名认证审核失败", "重新提交")
         return "认证失败";
       }
     } catch (e) {

     }
    
   }, 
   wuxDialog: (content, text)=>{
     $wuxDialog.open({
       title: '',
       content: content,
       buttons: [
         {
           text: text,
           type: 'weui-dialog__btn_primary',
           onTap(e) {
             wx.navigateTo({
               url: '../certification/certification',
             })
           },
         },
         {
           text: '取消',
         },
       ],
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
})
