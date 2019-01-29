
const network = require('../../utils/network.js')
import { $wuxToptips } from '../../components/wux'
import { $wuxCountDown } from '../../components/wux'
var that 
Page({
  data: {
      tel: '',
      telDisabled : true,
      code : ""
  },
  onLoad(){
    that = this;
    network.requestLoading("profile/init", {} , "", function (res) {
      that.setData({
        tel: res.mobile
      })
    }, function () {

    })
  }, showToptips(error) {
    const hideToptips = $wuxToptips.show({
      timer: 3000,
      text: error.msg || '请填写正确的字段',
      success: () => console.log('toptips', error)
    })
  },
  userNameTel: function (e) {
    this.setData({
      tel: e.detail.value
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
    if (e.detail.value.tel == '') {
      error.msg = '请输入手机号码'
      this.showToptips(error)
      return
    } else if (e.detail.value.tel.length < 11) {
      error.msg = '请输入正确的手机号'
      this.showToptips(error)
      return
    }
    if (that.data.telDisabled){
      var param = {}
      param.modifyType = "2"
      param.smsVeriCode = params.code
      network.requestLoading("profile/check_verify_code", param, "正在验证手机号码", function (res) {
        that.c2.stop()
        that.setData({
          tel: "",
          code: "",
          telDisabled: false,
          c2: '获取验证码',
        })
      }, function () {

      })
    }else{
      var param = {}
      param.mobile = params.tel
      param.smsVeriCode = params.code
      network.requestLoading("profile/modify_mobile", param, "正在换绑手机号码", function (res) {
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
     
    }
   
  },
  vcode() {
    var error = {};
    if (this.data.tel==''){
      error.msg = '请输入手机号码'
      this.showToptips(error)
      return
    } else if (this.data.tel.length < 11){
      error.msg = '请输入正确的手机号'
      this.showToptips(error)
      return
    }
    if (that.data.telDisabled){
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
    }else{
      var param = new Object();
      param.mobile = this.data.tel
      //校验新手机号码
      network.request("passport/check_mobile", param, function (res) {
        //发送短信
        console.log("发送短信")
        network.requestLoading("passport/send_verify_code", param, "加载中", function (res) {
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
      }, function () {
        error.msg = '手机号码已注册'
        that.showToptips(error)
      })
    }
	},
 
})
