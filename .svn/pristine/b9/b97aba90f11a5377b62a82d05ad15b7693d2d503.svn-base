const network = require('../../utils/network.js')
const util = require('../../utils/util.js')
import { $wuxDialog } from '../../components/wux'
import { $wuxToptips } from '../../components/wux'


var pageNo = 2  // 页码
const pageSize ="10"  // 每页大小 
var that = ""; 
var collects = [];//是否展示 催候选人
var  name = [];

Page({
  data: {
    listReport : {},
    collect: [],
    hidden: false,
  }, 
  onLoad: function () {
    that = this;
    this.initData();
  },

  operationReport: function (operation){
    if (operation.currentTarget.dataset.status == "待授权"){
        
      $wuxDialog.confirm({
        title: '提示',
        content: '取消后，该订单将作废，确认取消该订单么？',
        onConfirm(e) {
          var param = new Object();
          param.reportId = operation.currentTarget.dataset.id
          network.request("template/cancel_query", param, function (res) {
              //修改状态
              that.data.listReport[operation.currentTarget.dataset.index].status = "已取消"
              that.setData({
                listReport: that.data.listReport,
              })
          }, function () {

          })
        },
        onCancel(e) {

        },
      })
    } else {
        $wuxDialog.confirm({
          title: '提示',
          content: '确认删除报告？',
          onConfirm(e) {
            var param = new Object();
            param.reportId = operation.currentTarget.dataset.id
            network.request("template/del_report", param, function (res) {
              //删除报告
              that.data.listReport.splice(operation.currentTarget.dataset.index, 1)
              var flag = true;
              if (that.data.listReport.length > 0) {
                flag = false;
              }
              that.setData({
                listReport: that.data.listReport,
                hidden: flag 
              })
            }, function () {

            })
          },
          onCancel(e) {

          },
        })
    }
  }, collectReport:(e)=>{
    var param = new Object();
    param.reportId = e.currentTarget.dataset.id
    network.request("template/send_again", param, function (res) {
        that.data.collect[e.currentTarget.dataset.index] = true
        that.setData({
          collect: that.data.collect,
        })
    }, function () {

    })  
  },
  viewReport:(e)=>{
    if (e.currentTarget.dataset.status == "已完成") {
        wx.navigateTo({
          url: '../reportdetail/reportdetail?id=' + e.currentTarget.dataset.id,
        })
    }else{
      $wuxToptips.show({
        timer: 2000,
        text: e.currentTarget.dataset.status,
        success: () => console.log('toptips', e.currentTarget.dataset.status)
      })
    }
  }, 
  initData(){
    var param = new Object();
    param.status = ""
    param.pageNo = "1"
    param.pageSize = pageSize
    network.request("template/list_report", param, function (res) {
      var items = res;
      var flag =  true;
      if (items.length > 0){
        flag = false;
      }
      for (var i = 0; i < items.length;i++){
        collects[i] = false
        if (res[i].status == 1 ){
          res[i].status = "待授权"
        }
        if (res[i].status == 2) {
          res[i].status = "待授权"
          collects[i] = true
        }
        if (res[i].status == 3) {
          res[i].status = "已取消"
        }
        if (res[i].status == 4) {
          res[i].status = "已完成"
        }
        res[i].orderAmt = res[i].orderAmt.toFixed(2)
        res[i].createTime =  util.formatTime(new Date(res[i].createTime))
      }
      that.setData({
        listReport: res,
        collect: collects,
        hidden : flag
      })
    }, function () {

    })
  },
  onclickempty: () => {
    that.initData()
  },
  //下拉刷新
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    console.log("下拉刷新");
    pageNo = 2;
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
    
    var param = new Object();
    param.status = ""
    param.pageNo = pageNo
    param.pageSize = pageSize
    network.request("template/list_report", param, function (res) {
      var items = res;
      if (items.length > 0) {
          pageNo ++;
      }else{

        return
      }
      for (var i = 0; i < items.length; i++) {
        collects[i] = false
        if (res[i].status == 1) {
          res[i].status = "待授权"
        }
        if (res[i].status == 2) {
          res[i].status = "待授权"
          collects[i] = true
        }
        if (res[i].status == 3) {
          res[i].status = "已取消"
        }
        if (res[i].status == 4) {
          res[i].status = "已完成"
        }
        res[i].orderAmt = res[i].orderAmt.toFixed(2)
        res[i].createTime = util.formatTime(new Date(res[i].createTime))
      }
      that.setData({
        listReport: that.data.listReport.concat(res),
        collect: collects,
      })
    }, function () {

    })
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
    
    }, 1500);
  }
})
