// pages/unit-select/unit-select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unit_detail: [], // 执收单位列表信息
    unit_region_number: "", // 省市区编号
    unit_receipt_number: "", // 执收单位编号
    id: "", // 执收单位id
    unit_name: "" // 执收单位名称
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
      unit_detail: prevPage.data.unitInfo.list
    });
    // console.log(prevPage.data.unitInfo.list);
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
  // 选择执收单位
  checkedTap: function (e) {
    this.setData({
      unit_region_number: e.currentTarget.dataset.region_number,
      id: e.currentTarget.dataset.id,
      unit_name: e.currentTarget.dataset.unit_name,
      unit_receipt_number: e.currentTarget.dataset.receipt_number,
    });
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    let currentPage = pages[pages.length - 1];//本页
    prevPage.setData({//直接给上移页面赋值
      item2: currentPage.data
    });
    wx.navigateBack({
      url: '../index/index'
    });
  }
})