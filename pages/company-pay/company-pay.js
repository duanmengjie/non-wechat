// pages/payment/payment.js
const api = "http://192.168.1.197:7977/";
const getList = api + "wxdemandnote/findPaymentUnitNameList/"; // 代缴信息
const getCount = api + "wxdemandnote/findByUnitNameCount/";  // 总金额和条目
const getUserInfo = api + "wxdemandnote/findByCardUserInfo/"; // 查询用户信息
const getInfoDetail = api + "demandnoteInfo/detail/"; // 根据代缴费id获取代缴费详细信息

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    selectAll: false, // 全选
    selectSingerOne: false, // 一级复选框
    selectSingerTwo: false,  // 二级复选框
    unitno: "",
    is_show: false, // 默认弹框false
    oneid: "",  //一级id
    twoid: "",   //二级id
    countNumber: "", // 总条目总金额
    totalMoney: 0,   // 合计金额
    totalNumber: 0, // 合计数量
    userinfo: "", // 用户信息
    detailInfo: "" // 详细信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = getCurrentPages();    //获取加载的页面

    var currentPage = pages[pages.length - 1];    //获取当前页面的对象

    var prePage = pages[pages.length - 2];

    var url = currentPage.route;    //当前页面url

    var options = currentPage;

    this.setData({
      unitno: prePage.data.value
    });
    console.log(prePage);
    var that = this;
    wx.request({
      url: getList,
      method: "POST",
      data: {
        paymentUnitName: this.data.unitno
      },
      success: function (res) {
        that.setData({
          list: res.data.sprbody
        });
        console.log(res.data);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.request({
      url: getCount,
      method: "POST",
      data: {
        paymentUnitName: this.data.unitno
      },
      success: function (res) {
        that.setData({
          countNumber: res.data.sprbody
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log(0)
    // this.data.certno 参数
    var that = this;
    wx.request({
      url: getUserInfo,
      method: "POST",
      data: {
        user_card: this.data.unitno
      },
      success: function (res) {
        // console.log(res)
        if (res.data.errorCode === "00") {
          that.setData({
            userinfo: res.data.sprbody
          })
        }
      }
    });
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
  selectAll: function (e) {
    let i = 0, allNumber = 0, Allprice = 0;
    if (!this.data.selectAll) {
      for (i = 0; i < this.data.list.length; i++) {
        this.data.list[i].isSelect = true;
        allNumber = allNumber + this.data.list[i].demandNoteMobileEntitys.length;
        for (var j = 0; j < this.data.list[i].demandNoteMobileEntitys.length; j++) {
          this.data.list[i].demandNoteMobileEntitys[j].isSelect2 = true;
          var price = Number(this.data.list[i].demandNoteMobileEntitys[j].money);
          this.data.totalMoney = (parseFloat(this.data.totalMoney) + parseFloat(price)).toFixed(2);
        }
      }
    } else {
      for (i = 0; i < this.data.list.length; i++) {
        this.data.list[i].isSelect = false;
        for (var j = 0; j < this.data.list[i].demandNoteMobileEntitys.length; j++) {
          this.data.list[i].demandNoteMobileEntitys[j].isSelect2 = false;
          var price = Number(this.data.list[i].demandNoteMobileEntitys[j].money);
          this.data.totalMoney = (parseFloat(this.data.totalMoney) - parseFloat(price)).toFixed(2);
        }
      }
    }
    // console.log(this.data.totalMoney);
    this.setData({
      selectAll: !this.data.selectAll,
      list: this.data.list,
      totalNumber: allNumber,
      totalMoney: this.data.totalMoney
    });
  },
  // 一级复选框
  selectSingerOne: function (e) {
    // debugger
    var index = e.currentTarget.dataset.index;
    var price = 0, Allprice = 0, Allnumber = 0;
    if (this.data.list[index].isSelect == true) {
      this.data.list[index].isSelect = false;
      for (var i = 0; i < this.data.list[index].demandNoteMobileEntitys.length; i++) {
        this.data.list[index].demandNoteMobileEntitys[i].isSelect2 = false;
        price = Number(this.data.list[index].demandNoteMobileEntitys[i].money);
        this.data.totalMoney = (parseFloat(this.data.totalMoney) - parseFloat(price)).toFixed(2);
        this.data.totalNumber = this.data.totalNumber - 1;
      }
    } else {
      this.data.list[index].isSelect = true;
      for (var i = 0; i < this.data.list[index].demandNoteMobileEntitys.length; i++) {
        this.data.list[index].demandNoteMobileEntitys[i].isSelect2 = true;
        price = Number(this.data.list[index].demandNoteMobileEntitys[i].money).toFixed(2);
        this.data.totalMoney = (parseFloat(this.data.totalMoney) + parseFloat(price)).toFixed(2);
        this.data.totalNumber = this.data.totalNumber + 1;
      }
    }
    for (var i = 0; i < this.data.list.length; i++) {
      for (var j = 0; j < this.data.list[i].demandNoteMobileEntitys.length; j++) {
        Allprice = (parseFloat(Allprice) + parseFloat(this.data.list[i].demandNoteMobileEntitys[j].money)).toFixed(2);
      }
    }
    if (Allprice == this.data.totalMoney) {
      this.data.selectAll = true;
    } else {
      this.data.selectAll = false;
    }
    this.setData({
      list: this.data.list,
      selectAll: this.data.selectAll,
      totalMoney: this.data.totalMoney,
      totalNumber: this.data.totalNumber
    });
  },
  // 二级复选框
  selectSingerTwo: function (e) {
    var Allprice = 0, price = 0;
    for (var i = 0; i < this.data.list.length; i++) {
      var type1 = this.data.list[i].paymentClassifyType;
      var index = e.currentTarget.dataset.index;
      this.data.twoid = e.currentTarget.dataset.type;
      if (this.data.twoid === type1) {
        var _checked = this.data.list[i].demandNoteMobileEntitys[index].isSelect2;
        if (_checked == true) {
          this.data.list[i].demandNoteMobileEntitys[index].isSelect2 = false;
          Allprice = (parseFloat(this.data.list[i].demandNoteMobileEntitys[index].money) - parseFloat(Allprice)).toFixed(2);
          this.data.totalMoney = (parseFloat(this.data.totalMoney) - parseFloat(Allprice)).toFixed(2);
          this.data.totalNumber = this.data.totalNumber - 1;
        } else {
          this.data.list[i].demandNoteMobileEntitys[index].isSelect2 = true;
          Allprice = (parseFloat(this.data.list[i].demandNoteMobileEntitys[index].money) + parseFloat(Allprice)).toFixed(2);
          this.data.totalMoney = (parseFloat(this.data.totalMoney) + (parseFloat(Allprice))).toFixed(2);
          this.data.totalNumber = this.data.totalNumber + 1;
        }
      }
    }
    for (var i = 0; i < this.data.list.length; i++) {
      for (var j = 0; j < this.data.list[i].demandNoteMobileEntitys.length; j++) {
        price = (parseFloat(price) + parseFloat(this.data.list[i].demandNoteMobileEntitys[j].money)).toFixed(2);
        if (this.data.list[i].demandNoteMobileEntitys[j].isSelect2 == true) {
          this.data.list[i].isSelect = true;
        } else {
          this.data.list[i].isSelect = false;
        }
      }
    }
    if (price == this.data.totalMoney) {
      this.data.selectAll = true;
    } else {
      this.data.selectAll = false;
    }
    this.setData({
      list: this.data.list,
      totalMoney: this.data.totalMoney,
      totalNumber: this.data.totalNumber,
      selectAll: this.data.selectAll
    });
  },
  // 关闭详情
  closeEven: function (e) {
    this.setData({
      is_show: false
    })
  },
  // 弹框显示
  dialogMsg: function (e) {
    console.log(e);
    var that = this;
    this.setData({
      is_show: true
    });
    wx.request({
      url: getInfoDetail + e.currentTarget.dataset.uniquenesscode,
      success: function (res) {
        that.setData({
          detailInfo: res.data
        });
        // console.log(res);
      }
    })
  }
})