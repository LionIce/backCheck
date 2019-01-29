
const network = require('../../utils/network.js')
import { $wuxToptips } from '../../components/wux'
import { $wuxCountDown } from '../../components/wux'
var that 
Page({
  data: {

  },
  onLoad(){
    that = this;
 
  }, showToptips(error) {
    const hideToptips = $wuxToptips.show({
      timer: 3000,
      text: error.msg || '请填写正确的字段',
      success: () => console.log('toptips', error)
    })
  },
  submitForm(e) {
    const params = e.detail.value
    console.log(params)
    var error = {};
    if (e.detail.value.code == '') {
      error.msg = '请输入验证码'
      this.showToptips(error)
      return
    } else if (e.detail.value.code.length != 6) {
      error.msg = '请输入正确的验证码'
      this.showToptips(error)
      return
    }
    if (e.detail.value.oldpwd == '') {
      error.msg = '请输入原始密码'
      this.showToptips(error)
      return
    } else if (e.detail.value.oldpwd.length < 6) {
      error.msg = '请输入正确的原始密码'
      this.showToptips(error)
      return
    }

    if (e.detail.value.newpwd == '') {
      error.msg = '请输入原始密码'
      this.showToptips(error)
      return
    } else if (e.detail.value.newpwd.length < 6) {
      error.msg = '请输入正确的原始密码'
      this.showToptips(error)
      return
    }
    var param = {}
    param.modifyType = "1"
    param.smsVeriCode = params.code
    network.request("profile/check_verify_code", param, function (res) {
      var paramPwd = {}
      paramPwd.loginPass = params.oldpwd
      paramPwd.newLoginPass = params.newpwd
      network.requestLoading("profile/modify_login_pass", paramPwd, "请稍后", function (res) {
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
    }, function () {

    })
  },
  vcode() {
    //校验原手机
    network.requestLoading("profile/send_verify_code", {}, "正在发送短信", function (res) {
        if (that.c2 && that.c2.interval) return !1
        that.c2 = new $wuxCountDown({
          date: +(new Date) + 60000,
          onEnd() {
            this.setData({
              c2: '重新获取验证码',
            })
          },
          render(date) {
            const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
            date.sec !== 0 && that.setData({
              c2: sec,
            })
          },
        })
    }, function () {
        error.msg = '获取验证码失败'
        that.showToptips(error)
    })
	},
 
})
