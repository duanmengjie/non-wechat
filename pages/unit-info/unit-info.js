// pages/unit-info/unit-info.js
const api = "http://192.168.1.197:7977/";
const getCard = api + "wxdemandnote/findByNumberAndCard";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    opacity: 0.4,
    items: [
      { name: '学生证' },
      { name: '身份证' },
      { name: '居住证'}
    ],
    userInfo: "", // 请求得到的用户信息
    typeName: "", // 证件类型
    paperwork: "", // 证件号码
    unit_name: "", //执收单位名称
    unit_number: "", //省市区编号
    receipt_number: "", // 执收单位
    type_show: false // 证件类型是否显示
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
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    let currentPage = pages[pages.length - 1];//本页
    this.setData({
      unit_name: prevPage.data.item2.unit_name,
      unit_number: prevPage.data.item2.unit_region_number,
      receipt_number: prevPage.data.item2.unit_receipt_number
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
  
  },
  // 证件类型 下拉框显示
  radioChange: function (e) {
    // console.log(e);
    this.setData({
      typeName: e.detail.value,
      type_show: false
    });
  },
  // 选择证件类型事件
  selectTap: function(e) {
    this.setData({
      type_show: true
    });
  },
  // 证件号触发事件
  bindKeyInput: function(e) {
    if(e.detail.value) {
      this.setData({
        paperwork: e.detail.value,
        opacity: 1
      });
    } else {
      this.setData({
        paperwork: e.detail.value,
        opacity: 0.4
      });
    }
    //console.log(e);
  },
  // 
  cardSubmit: function(e) {
    var that = this;
    wx.request({
      url: getCard,
      method: "POST",
      data: {
        receipt_number: this.data.unit_receipt_number,
        user_card: this.data.paperwork
      },
      success: function(res) {
        // console.log(res);
        if (res.data.errorCode==="00") {
          if (res.data.sprbody === null) {
            wx.showToast({
              title: '暂无缴费信息',
              showCancel: false,
              icon: "none"
            })  
          }else {
            that.setData({
              userInfo: res.data.sprbody
            });
            // wx.navigateTo({
            //   url: '../unit-pay/unit-pay',
            // })
          }
        }
      }
    })
  }
})