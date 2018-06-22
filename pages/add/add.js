const api = "http://192.168.1.197:7977/";
const getPeoAdd = api + "wxdemandnote/paymentPeoAdd";

Page({
  data: {
    input_name: '',
    input_card: '',
    input_phone: '',
  },
  changeValueBlur1: function (e) {
    var data = e.detail.value;
    this.setData({
      input_name: data
    });
    // console.log(data);
  },
  changeValueBlur2: function (e) {
    var data = e.detail.value;
    this.setData({
      input_card: data
    })
  },
  changeValueBlur3: function (e) {
    var data = e.detail.value;
    this.setData({
      input_phone: data
    })
  },
  handlePost: function (e) {
    var that = this;
    var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (that.data.input_card == '') {
      wx.showToast({
        title: '身份证号为必填项',
        showCancel: false,
        icon: "none",
        duration: 1000
      })
    } else if (this.data.input_card.length < 18) {
      wx.showToast({
        title: '身份号不得少于18位',
        showCancel: false,
        icon: "none"
      })
    } else if (reg.test(this.data.input_card) === false) {
      wx.showToast({
        title: '身份证输入不合法',
        showCancel: false,
        icon: "none"
      })
    } else {
      wx.request({
        url: getPeoAdd,
        method: 'POST',
        data: {
          'payment_card': that.data.input_card,
          'payment_name': that.data.input_name,
          'payment_phone': that.data.input_phone
        },
        success: function (res) {
          console.log(res)
          if (res.data.errorCode === "00") {
            wx.navigateBack({
              url: '../administration/administration'
            })
          } else {
            wx.showToast({
              title: '点击没反应',
              showCancel: false,
              icon: "none",
              duration: 1000
            })
          }
        }
      })
    }
  }
})