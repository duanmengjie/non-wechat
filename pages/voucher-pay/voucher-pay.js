// pages/voucher-pay/voucher-pay.js
const api = "http://192.168.1.197:7977/";
const getCodeList = api + "demandnote/findPaymentCodeList/"; // 通过缴款码获取代缴信息
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paymentCode: "",
    paymentCodeInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var pages = getCurrentPages();    //获取加载的页面
    let prevPage = pages[pages.length - 2];
    this.setData({
      paymentCode: prevPage.data.value,
      paymentCodeInfo: prevPage.data.paymentCodeInfo
    }); 
    console.log(prevPage);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})