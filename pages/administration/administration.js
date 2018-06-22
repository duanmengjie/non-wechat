Page({
  data: {
    hide: true,
    numbers: 2088102173167589,
    arrays: [],
    touch_end: '',
    touch_start: '',
    uhide: 0,
    item: 0,
    postname:'',
    postcard:'',
    postphone:''
  },
  onShow: function (options) {
    let that = this;
    wx.request({
      url: 'http://192.168.1.197:7977/wxdemandnote/findByUseridPaymentPeo',
      method: 'POST',
      data: {
        'user_id': this.data.numbers
      },
      success: function (res) {
        let datas = res.data.sprbody;
        that.setData({
          arrays: datas
        })
      }
    })
  }, 

  //页面获取数据
  add:function(event){
    var that = this
    wx.request({
      url: 'http://192.168.1.197:7977/wxdemandnote/findByUseridPaymentPeo',
      method: 'POST',
      data: {
        'user_id': this.data.numbers
      },
      success: function (res) {
        let datas = res.data.sprbody
        that.setData({
          arrays: datas
        })
      }
    })
    console.log(this.data.numbers);
  },

  //延迟点击
  editAddress: function (event) {
    let that = this;
    let postId = event.target.dataset.postid
    this.setData({
      item: postId
    })
    let item = that.data.uhide
    //触摸时间距离页面打开的毫秒数  
    var touchTime = that.data.touch_end - that.data.touch_start;
    //如果按下时间大于350为长按  
    if (touchTime > 500) {
      that.setData({
        hide: false,
        uhide: postId
      })
    } else if (that.data.hide == false){
      that.setData({
        hide: true,
        uhide:0
      })
    } else{
      wx.showToast({
        title: '请长按点击删除',
        showCancel: false,
        icon: "none",
        duration: 1000
      }) 
    }
  },
  //按下事件开始  
  mytouchstart: function (e) {
    console.log(e.timeStamp)
    let that = this;
    that.setData({
      touch_start: e.timeStamp
    })
  },
  //按下事件结束  
  mytouchend: function (e) {
    let that = this;
    that.setData({
      touch_end: e.timeStamp
    })
  }, 


  //点击删除
  handleCilckOdd: function(event){
    var that = this
    let num = this.data.item
    wx.request({
      url: 'http://192.168.1.197:7977/wxdemandnote/paymentPeoDelete',
      method: 'POST',
      data: {
        'id': num
      },
      success: function (res) {
        that.add(event)
      }
    })
  },


  //点击修改内容
  handleClickModify: function(event){
    let that = this;
    let postId = event.target.dataset.postid
    let postname = event.target.dataset.name;
    let postcard = event.target.dataset.card;
    let postphone = event.target.dataset.phone;
    wx.navigateTo({
      url: `./administrationAdd/administrationAdd?id=${postId}&&name=${postname}&&card=${postcard}&&phone=${postphone}`
    })
  },


  //点击跳转
  handleClickNav: function(e){
    wx.navigateTo({
      url: '../add/add'
    })
  }
})