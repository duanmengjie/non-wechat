const api = "http://192.168.1.197:7977/";
const getRecordList = api + "wxdemandnote/paymentInfo/recordList/";
const getClassify = api + "paymentClassify/findList";

Page({
  data: {
    hide: false,
    show: true,
    bgcolor: '',
    list: [],
    hasMoreData: true,
    contentlist: [],
    nodata: false,
    page: 1,
    pageSize: 7,
    certno: "330224196702265835",
    wx_user_id: "wx20180001",
    classifyname: "全部",
    url: api,
    currPrice: "", // 本月缴费用
    projectClassify: -1 // 分类id
  },
  onLoad: function (options) {
    var that = this;
    that.getInfo('正在加载数据...');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.getInfo('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  }, 
  getInfo: function () {
    var that = this;
    wx.request({
      url: getRecordList + this.data.page + "/" + this.data.pageSize + "/" + this.data.projectClassify + "/" + this.data.certno + "/" + this.data.wx_user_id + "/voucher",
      method: 'GET',
      success: function (res) {
        var contentlistTem = that.data.contentlist;
        if (res.data.errorCode === "00") {
          that.setData({
            currPrice: res.data.sprbody.currPrice
          });
          if (that.data.page == 1) {
            contentlistTem = [];
          }
          var contentlist = res.data.sprbody.list;
          if (contentlist.length < that.data.pageSize) {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: false
            })
          } else {
            that.setData({
              contentlist: contentlistTem.concat(contentlist),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          wx.showToast({
            title: "请求失败",
          })
        }
      }
    });
  },
  handeClickHide: function (event) {
    var that = this;
    wx.request({
      url: getClassify,
      method: 'GET',
      success: function (res) {
        let datas = res.data;
        for (var i = 0; i < datas.length; i++) {
          datas[i].img2 = api + datas[i].img2
        }
        that.setData({
          list: datas
        });
      }
    });
    if (this.data.hide == false) {
      this.setData({
        hide: true,
        bgcolor: '#1f8de3'
      })
    } else {
      this.setData({
        hide: false,
        bgcolor: ''
      })
    }
  },
  // 点击空白关闭
  closeEvent: function () {
    this.setData({
      hide: false,
      bgcolor: ''
    })
  },
  // 选中类型
  selectedType: function (e) {
    this.setData({
      projectClassify: e.currentTarget.dataset.type,
      page: 1,
      classifyname: e.currentTarget.dataset.name
    });
    var that = this;
    wx.request({
      url: getRecordList + this.data.page + "/" + this.data.pageSize + "/" + this.data.projectClassify + "/" + this.data.certno + "/" + this.data.wx_user_id + "/voucher",
      method: 'GET',
      success: function (res) {
        if (res.data.errorCode === "00") {
          if (res.data.sprbody.list.length > 0) {
            that.setData({
              contentlist: res.data.sprbody.list,
              hide: false,
              bgcolor: '',
              nodata: false,
              currPrice: res.data.sprbody.currPrice
            });
          } else {
            that.setData({
              contentlist: res.data.sprbody.list,
              nodata: true,
              hide: false,
              bgcolor: '',
              currPrice: res.data.sprbody.currPrice
            });
          }
        }
      }
    });
  }
})