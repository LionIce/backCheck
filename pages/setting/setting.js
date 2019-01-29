const network = require('../../utils/network.js')
import { $wuxDialog } from '../../components/wux'

var ponent = [
  {
    title: '换绑手机',
    remark: '　',
    url: '/pages/changemobile/changemobile',
  },
  {
    title: '修改登录密码',
    remark: '　',
    url: '/pages/updatapwd/updatapwd',
  },
  // {
  //   title: '关于我们',
  //   remark: '　',
  //   url: '/pages/barcode/index',
  // },
]
Page({
  data: {
    components : ponent
  },
  confirm() {
    $wuxDialog.confirm({
      title: '提示',
      content: '确定要退出吗？',
      onConfirm(e) {
        var token = "";
        try {
          token = wx.getStorageSync('token')
        } catch (e) {

        }
        var param = new Object();
        param.token = token
        network.request("passport/logout", param, function (res) {
          wx.setStorage({
            key: "token",
            data: ""
          })
          try {
            wx.clearStorageSync()
          } catch (e) {
            // Do something when catch error
          }
          wx.switchTab({
            url: '../find/find',
            success: () => {
              var page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            }
          })
        }, function () {

        })
      },
      onCancel(e) {
        
      },
    })
  },
})
