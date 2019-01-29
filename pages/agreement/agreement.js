const network = require("../../utils/network.js")

Page({
  data: {
    imgUrls: [ 
      network.url + "agreement_1.png",
      network.url + "agreement_2.png",
      network.url + "agreement_3.png",
      network.url + "agreement_4.png",
      network.url + "agreement_5.png",
      network.url + "agreement_6.png",
      network.url + "agreement_7.png",
      network.url + "agreement_8.png",
    ],
  },
  onLoad:()=>{
    console.log()
  }
})