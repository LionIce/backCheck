const network = require('../../utils/network.js')
import { $wuxToptips } from '../../components/wux'
var that = ""
var openId = ""
Page({
  data: {
    money : "0.00" ,
    rechargeMoney :"0.00",
    items: [
      { money: "￥100", value:"100", checked: false },
      { money: "￥200", value: "200",checked: false },
      { money: "￥500", value: "500", checked: false },
      { money: "￥1000", value: "1000", checked: false },
      { money: "￥5000", value: "5000",checked: false },
      { money: '其他金额', value: "0", checked: true},
    ]
  },
  onLoad:function(){
    that = this;
    this.initData();
  },
  moneyInput: function (e) {
    var char = e.detail.value;
    console.log(parseFloat(char).toFixed(2));
    

    
    this.setData({
      money: char
    })

  },
  initData: function(){
    var param = {}
    network.requestLoading("account/least_recharge_money", param, "", function (res) {
      that.setData({
        rechargeMoney: res.leastRechargeMoney,
      })
    }, function () {

    })
  },
  checkMoney:function(e){
    var char =  parseFloat(e.currentTarget.dataset.money).toFixed(2)
    var recharge = this.data.items;
    for (var i = 0; i < recharge.length;i++){
      this.data.items[i].checked = false
    }
    this.data.items[e.currentTarget.dataset.index].checked = true
    this.setData({
      money: char,
      items: this.data.items
    })
  },
  recharge:function(e){
    if (that.data.money >= that.data.rechargeMoney){
      //调用微信登录接口  
      wx.login({
        success: function (loginCode) {
          var loginCodeParam = {}
          loginCodeParam.code = loginCode.code
          //获取openId
          network.request("passport/get_openid", loginCodeParam, function (openId) {
            var param = new Object();
            param.orderType = "1"
            param.orderAmt = that.data.money
            param.payChnl = "2"
            param.openId = openId
            //获取支付参数
            network.requestLoading("account/recharge", param, "请稍后", function (res) {
              console.log(res);
              //调起支付
              wx.requestPayment({
                'appId': res.appId,
                'timeStamp': res.timeStamp,
                'nonceStr': res.nonceStr,
                'package': res.package,
                'signType': 'MD5',
                'paySign': res.paySign,
                'success': function (res) {
                    wx.switchTab({
                      url: '../my/my',
                      success: () => {
                        var page = getCurrentPages().pop();
                        console.log("page", page)
                        if (page == undefined || page == null) return;
                        page.onLoad();
                      }
                    })
                },
                'fail': function (res) {
                  wx.showToast({
                    image: "../../assets/images/jg_hud_error_3x.png",
                    title: res.data.errorMsg != null ? res.data.errorMsg : "充值失败",
                    success: () => console.log(res.data.errorMsg != null ? res.data.errorMsg : "充值失败")
                  })
                },
                'complete': function (res) {
                   
                }
              })
            }, function () {

            })
          }, function () {

          })
        }
      })  
     }else{
      that.showToptips("充值金额不能小于" + that.data.rechargeMoney+"元");
     }
  } ,
  showToptips(error) {
    const hideToptips = $wuxToptips.show({
      timer: 3000,
      text: error,
      success: () => console.log('toptips', error)
    })
  },
})
