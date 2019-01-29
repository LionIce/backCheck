
import { $wuxCountUp } from '../../components/wux'
Page({
  data: {
    
  }, 
  onLoad(option) {

    this.c1 = new $wuxCountUp(0, option.acctBal, 2, 1, {
      
      printValue(value) {
        this.setData({
          c1: value,
        })
      }
    })

    this.c1.start()
  },
  onRechargeList: () => {
    wx.navigateTo({
      url: '../rechargelist/rechargelist',
    })
  },
  recharge:()=>{
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  }
})
