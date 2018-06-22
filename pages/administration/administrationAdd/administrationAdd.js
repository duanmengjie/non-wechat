Page({
  data: {
    postid: 0,
    postname: '',
    postcard: '',
    postphone: ''
  },
  onLoad: function (options) {
    let id = options.id;
    let name = options.name;
    let card = options.card;
    let phone = options.phone;
    this.setData({
      postid: id,
      postname: name,
      postcard: card,
      postphone: phone
    })
  },
  changeValueBlur1: function (e) {
    var data = e.detail.value;
    this.setData({
      postname: data
    });
  },
  changeValueBlur2: function (e) {
    var data = e.detail.value;
    this.setData({
      postcard: data
    })
  },
  changeValueBlur3: function (e) {
    var data = e.detail.value;
    this.setData({
      postphone: data
    })
  },
  handlePost: function (event) {
    var that = this
    let postid = that.data.postid;
    let postname = that.data.postname;
    let postcard = that.data.postcard;
    let postphone = that.data.postphone;
    var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (that.data.postcard == '') {
      wx.showToast({
        title: '身份证号为必填项',
        showCancel: false,
        icon: "none",
        duration: 1000
      })
    } else if (this.data.postcard.length < 18 || reg.test(this.data.postcard) === false) {
      wx.showToast({
        title: '身份证号输入有误',
        showCancel: false,
        icon: "none"
      })
    } else {
      wx.request({
        url: 'http://192.168.1.197:7977/wxdemandnote/paymentPeoUpdate',
        method: 'POST',
        data: {
          'id': postid,
          "payment_card": postcard,
          "payment_name": postname,
          "payment_phone": postphone
        },
        success: function (res) {
          console.log(res);
          wx.navigateBack({
            url: '../administration'
          })
        }
      })
    }
  }
})