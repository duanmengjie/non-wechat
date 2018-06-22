// pages/unit-pay/unit-pay.js
const api = "http://192.168.1.197:7977/";
const getCard = api + "wxdemandnote/findByNumberAndCard";
const getFindPay = api + "/wxdemandnote/findPayment";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    unit_name: "", // 执收单位名称
    unit_number: "",  // 执收单位编号
    isSize: 0, // 缴费数量
    totalMoney: 0, // 缴费总额
    cardId: "", // 身份证号
    user_Info: "", // 用户信息
    isAllSelect: false, // 全选
    personInfo: [] // 缴费人列表
    // personInfo: [{
    //   id:1,
    //   isSelect: "false",
    //   pay_deadline: "2018-09-23",
    //   pay_name: "报名费",
    //   pay_number: "jf000001",
    //   pay_price: 150
    // }, {
    //   id: 3,
    //   isSelect: "false",
    //   pay_deadline: "2018-09-30",
    //   pay_name: "期末补考费",
    //   pay_number: "jf000003",
    //   pay_price: 200
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // this.data.unit_number
    // wx.request({
    //   url: getCard,
    //   method: "POST",
    //   data: {
    //     receipt_number: "003",
    //     user_card: this.data.cardId
    //   },
    //   success: function (res) {
    //     // console.log(res);
    //     if (res.data.errorCode === "00") {
    //       that.setData({
    //         user_name: res.data.sprbody.user_name
    //       });
    //     }
    //   }
    // });
    // console.log(this.data);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.request({
      url: getFindPay,
      method: "POST",
      data: {
        user_card: this.data.cardId
      },
      success: function (res) {
        // console.log(res);
        if (res.data.errorCode === "00") {
          that.setData({
            personInfo: res.data.sprbody.list
          });
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    let currentPage = pages[pages.length - 1];//本页
    this.setData({
      unit_name: prevPage.data.unit_name,
      unit_number: prevPage.data.receipt_number,
      cardId: prevPage.data.paperwork,
      user_Info: prevPage.data.userInfo
    });
    // console.log(prevPage);
    // console.log(this.data);
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

  },
  // 全选
  allSelectEvent: function () {
    var allprice = 0, allnumber = 0;
    if (!this.data.isAllSelect) {
      for (var i = 0; i < this.data.personInfo.length; i++) {
        this.data.personInfo[i].isSelect = true;
        this.data.totalMoney = this.data.totalMoney + this.data.personInfo[i].pay_price;
        this.data.isSize = this.data.isSize + 1;
      }
    } else {
      for (var i = 0; i < this.data.personInfo.length; i++) {
        this.data.personInfo[i].isSelect = false;
        this.data.totalMoney = this.data.totalMoney - this.data.personInfo[i].pay_price;
        this.data.isSize = this.data.isSize - 1;
      }
    }
    this.setData({
      isAllSelect: !this.data.isAllSelect,
      personInfo: this.data.personInfo,
      totalMoney: this.data.totalMoney,
      isSize: this.data.isSize
    });
  },
  // 单选
  selectSinger: function (e) {
    var index = e.currentTarget.dataset.index;
    var allprice = 0, allnumber = 0;
    if (this.data.personInfo[index].isSelect == true) {
      this.data.personInfo[index].isSelect = false;
      this.data.totalMoney = this.data.totalMoney - this.data.personInfo[index].pay_price;
      this.data.isSize = this.data.isSize - 1;
    } else {
      this.data.personInfo[index].isSelect = true;
      this.data.totalMoney = this.data.totalMoney + this.data.personInfo[index].pay_price;
      this.data.isSize = this.data.isSize + 1;
    }
    for (var i = 0; i < this.data.personInfo.length; i++) {
      allprice = allprice + this.data.personInfo[i].pay_price;
    }
    if (allprice === this.data.totalMoney) {
      this.data.isAllSelect = true;
    } else {
      this.data.isAllSelect = false;
    }
    this.setData({
      personInfo: this.data.personInfo,
      totalMoney: this.data.totalMoney,
      isAllSelect: this.data.isAllSelect,
      isSize: this.data.isSize
    });
  }
})