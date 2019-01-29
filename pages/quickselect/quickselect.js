
var that = "";    //在请求数据时setData使用
const network = require('../../utils/network.js')
import { $wuxToptips } from '../../components/wux'
import WxValidate from '../../assets/plugins/WxValidate'

Page({
  data: {
    tplList: [],
    current : 0,

  },
  onLoad: function (option) {
    that = this;
    network.requestLoading("template/list_info", {}, "", function (res) {
      var list = res.tplList;
      for (var i = 0; i < list.length; i++) {
        if (list[i].displayMode == 1) {
          var str = list[i].customSummary;
          var itemName = [];
          if (str.split(";").length > 1) {
            list[i].childrenTemplate = str.split(";")[0]
            for (var j = 0; j < str.split(";")[1].split(",").length; j++) {
              itemName = itemName.concat(str.split(";")[1].split(",")[j])
            }
          } else {
            for (var k = 0; k < str.split(",").length; k++) {
              itemName = itemName.concat(str.split(",")[k]);
            }
          }
          list[i].items = itemName
        }
        list[i].chargeAmt = res.tplList[i].chargeAmt.toFixed(2)
      }
      that.setData({
        tplList: list,
        current: option.current
      })
    }, function () {

    })
  },
  listenSwiper:function (e) {
    that.setData({
      current: e.detail.current,
    })
  },
  submitForm(e) {
    var params = e.detail.value
    console.log(params)
    var index  = 0;
    var error = {}
    for(var key in params){
      if (params[key] != null && params[key] != ""){
        //输入项
        that.data.tplList[that.data.current].inputs[index].value = params[key];
        switch (that.data.tplList[that.data.current].inputs[index].ioFormat){
            case 1:
                if (!/^[\u4E00-\u9FA5]{2,}$/.test(params[key])){
                  error.msg = "姓名格式不正确"
                  that.showToptips(error)
                  return
                }
                break
            case 2:
            if (!/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(params[key])){
                error.msg = "身份证号格式不正确"
                that.showToptips(error)
                return
              }
            break
            case 3:
              if (!/(^(13\d|14[57]|15[^4,\D]|17[135678]|18\d)\d{8}|170[^346,\D]\d{7})$/.test(params[key])) {
                error.msg = "手机号码格式不正确"
                that.showToptips(error)
                return
              }
              break
            case 4:
              if (!/^(\d{16}|\d{17}|\d{18}|\d{19})$/.test(params[key])) {
                error.msg = "银行卡号格式不正确"
                that.showToptips(error)
                return
              }
              break
            case 5:
              if (!/^[a-zA-Z0-9]{17}$/.test(params[key])) {
                  error.msg = "车架号格式不正确"
                  that.showToptips(error)
                  return
              }
            break
            case 6:
              if (!/^[\u4E00-\u9FA5][\da-zA-Z]{6}$/.test(params[key])) {
                error.msg = "车牌号格式不正确"
                that.showToptips(error)
                return
              }
            break
          default:
          
             break
          
        }
      } else{
        if(that.data.tplList[that.data.current].inputs[index].id != "1170518160542137000"){
          error.msg = "请输入您的" + that.data.tplList[that.data.current].inputs[index].ioName
          that.showToptips(error)
          return
        }
      }
      index++;
    }
    wx.navigateTo({
      url: '../order/order?tpl=' + JSON.stringify(that.data.tplList[that.data.current]),
    })
  }, showToptips(error) {
    var hideToptips = $wuxToptips.show({
      timer: 3000,
      text: error.msg || '请填写正确的字段',
      success: () => console.log('toptips', error)
    })
  },
  
})

