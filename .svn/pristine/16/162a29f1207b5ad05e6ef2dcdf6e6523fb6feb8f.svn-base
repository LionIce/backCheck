
const network = require('../../utils/network.js')
import { $wuxToptips } from '../../components/wux'
import WxValidate from '../../assets/plugins/WxValidate'
import { $wuxCountDown } from '../../components/wux'

Page({
  data: {
      tel: '',
      checkbox: [
        {
          name: '我已阅读并同意《芝麻背调服务协议》',
          value: '0001',
          checked: !1,
        }
      ],
  },
  onLoad(){
    this.initValidate();
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
  agreement:()=>{
      wx.navigateTo({
        url: '../agreement/agreement',
      })
  },
  submitForm(e) {
    const form = e.detail.value
    console.log(form)
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      this.showToptips(error)
      return false
    }
    var param = new Object();
    param.mobile = form.tel
    param.smsVerifyCode = form.code
    param.modifyType = "5"
    param.loginPassConfirm = form.password
    param.newLoginPass = form.password
    //检验验证码
    network.request("passport/check_verify_code", param, function (res) {
      var modifyParam = new Object();
      modifyParam.mobile = form.tel
      modifyParam.modifyType = "5"
      modifyParam.loginPassConfirm = form.password
      modifyParam.newLoginPass = form.password
      //找回密码
      network.requestLoading("passport/modify_login_password", modifyParam, function (res) {
          wx.redirectTo({
            url: '../login/login',
          })
        }, function () {

        })
    }, function () {

    })
    
  },
  vcode() {
    var error = {};
    var that = this;
    if (this.data.tel==''){
      error.msg = '请输入手机号码'
      this.showToptips(error)
      return
    } else if (this.data.tel.length < 11){
      error.msg = '请输入正确的手机号'
      this.showToptips(error)
      return
    }
    var param = new Object();
    param.mobile = this.data.tel
    //校验手机号码
    network.request("passport/check_mobile", param, function (res) {
      error.msg = '手机号码未注册，请注册后再登录'
      that.showToptips(error)
    }, function () {
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
    })
     
	},
  initValidate() {
    //字段校验
    this.WxValidate = new WxValidate({
      tel: {
        required: true,
        tel: true,
      },
      password: {
        required: true,
        password: true,
      },
      code: {
        required: true,
        code: true,
      }
    }, {
        tel: {
          required: '请输入手机号',
          tel: '请输入正确的手机号',
        },password:{
          required: '请输入登录密码',
        },
        code: {
          required: '请输入验证码',
        }
      })
    this.WxValidate.addMethod('code', (value, param) => {
      return this.WxValidate.optional(value) || value.length == 6
    }, '请输入6位数的验证码')

    this.WxValidate.addMethod('password', (value, param) => {1
      return this.WxValidate.optional(value) || value.length >= 6
    }, '请输入大于6位数以上的密码')
  },

})
