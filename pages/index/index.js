//index.js
//获取应用实例
const app = getApp()
const api = "http://192.168.1.197:7977/";
const getUseridPaymentPeo = api + "wxdemandnote/findByUseridPaymentPeo";  // 根据当前用户查询缴款人信息
const getList = api + "wxdemandnote/list/"; // 获取代缴信息
const getUnit = api + "wxdemandnote/findByRegionReceiptUnit";  // 查询执收单位
const getCodeList = api + "wxdemandnote/findPaymentCodeList/"; // 通过缴款码获取代缴信息
const getUnitNameList = api + "wxdemandnote/findPaymentUnitNameList/"; // 根据企业名称获取代缴费信息

Page({
  data: {
    currentTab: 0,
    value: "",  // 身份证号
    disabled: true,
    opacity: 0.4,
    cardDialog: false,  // 身份证信息框显示
    selected: false,  // 判断缴款人已选中
    cardSigerInfo: {},
    // userInfo: [],
    item: {}, // 接收归属地信息
    item2: {}, // 接收执收单位
    unitInfo: "", // 执行单位
    select_identity: false, // 身份选择
    identity_name: "身份证号",
    identity_index: 0, // 
    identity_list: [{
      name: "身份证号",
      index: 0
    },{
      name: "缴款码",
      index: 1
    }, {
        name: "企业名称",
        index: 2
    }],
  },
  onLoad: function (option) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }, 
  onShow: function () {
    var pages = getCurrentPages();    //获取加载的页面

    var currentPage = pages[pages.length - 1];    //获取当前页面的对象

    var url = currentPage.route;    //当前页面url
    this.setData({
      item: currentPage.data.item,  // 地区信息
      item2: currentPage.data.item2 // 执收单位信息
    }); 
    // console.log(currentPage);
  },
  radioChange: function (e) {
    this.setData({
      selected: true,
      cardDialog: false,
      value: e.detail.value
    });
    if (this.data.value.length > 0) {
      this.setData({
        disabled: false,
        opacity: 1
      });
    }
  },
  // 滑块切换
  swiperTab: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  // 点击切换
  clickTab: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      });
    }
  },
  // 输入身份证号时触发事件
  bindKeyInput: function (e) {
    var card_txt = e.detail.value;
    if(card_txt) {
      this.setData({
        disabled: false,
        opacity: 1,
        value: card_txt
      });
    } else {
      this.setData({
        disabled: true,
        opacity: 0.4
      }) 
    }
  },
  // 身份证号下一步查询
  cardSubmit: function (e) {
    var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    var that = this;
    if (this.data.identity_index == 0) {
      if (this.data.value.length < 18) {
        wx.showToast({
          title: '身份号不得少于18位',
          showCancel: false,
          icon: "none"
        })
      } else if (reg.test(this.data.value) === false) {
        wx.showToast({
          title: '身份证输入不合法',
          showCancel: false,
          icon: "none"
        })
      } else {
        wx.request({
          url: getList + this.data.value + "/" + "voucher",
          method: "get",
          success: function (res) {
            if (res.data.length > 0) {
              wx.navigateTo({
                url: '../payment/payment?certno=' + that.data.value
              });
            } else {
              wx.navigateTo({
                url: '../../components/no_data/no_data'
              });
            }
          }
        })
      }
    } else if (this.data.identity_index == 1) {
      wx.request({
        url: getCodeList + this.data.value,
        method: "get",
        success: function (res) {
          if (res.data.sprbody != "") {
            wx.navigateTo({
              url: '../voucher-pay/voucher-pay'
            });
            that.setData({
              paymentCodeInfo: res.data.sprbody
            })
          } else {
            wx.navigateTo({
              url: '../../components/no_data/no_data'
            });
          }
        }
      })
    } else if (this.data.identity_index == 2) {
      wx.request({
        url: getUnitNameList,
        method: "POST",
        data: {
          paymentUnitName: this.data.value
        },
        success: function (res) {
          if (res.data.errorCode === "00") {
            if (res.data.sprbody.length > 0) {
              wx.navigateTo({
                url: '../company-pay/company-pay'
              });
              that.setData({
                paymentCodeInfo: res.data.sprbody
              });
            } else {
              wx.navigateTo({
                url: '../../components/no_data/no_data'
              });
            }
          }
        }
      })
    }
    
  },
  // 添加身份证信息框显示
  addCardInfo: function(e) {
    var that = this;
    if (that.data.select_identity === false) {
      this.setData({
        cardDialog: true
      });
    }
     wx.request({
       url: getUseridPaymentPeo,
       data: {
         user_id: 2088102173167589
       },
       method: "POST",
       success: function (res) {
         if (res.data.errorCode === "00") {
           that.setData({
             userInfo: res.data.sprbody
           })
         }
       }
     })
  },
  // 选择要添加的身份
  selectedTap: function() {
    this.setData({
      selected: true
    })
  },
  // 链到选择地区页面
  nextArea: function() {
    wx.navigateTo({
      url: '../area/area'
    })
  },
  // 链到选择执收单位页面
  nextUnit: function() {
    var that = this;
    console.log(this.data.item.area_id);
    if (this.data.item.city_name === undefined) {
      wx.showToast({
        title: '请先选择归属地',
        showCancel: false,
        icon: "none"
      }) 
      return false;
    } else {
      wx.request({
        url: getUnit,
        method: "POST",
        data: {
          "region_number": this.data.item.area_id
        },
        success: function (res) {
          if (res.data.errorCode === "00") {
            that.setData({
              unitInfo: res.data.sprbody
            });
            wx.navigateTo({
              url: '../unit-select/unit-select',
            });
          }
        }
      });
      this.setData({
        disabled: false,
        opacity: 1
      });
    }
  },
  // 下一步按执收单位查询
  cardSubmit2: function() {
    wx.navigateTo({
      url: '../unit-info/unit-info',
    });
  },
  // 选择查询类型事件
  selectEvent: function() {
    if (this.data.select_identity === false) {
      this.setData({
        select_identity: true
      })
    } else {
      this.setData({
        select_identity: false
      })
    }
    
  },
  // 选择查询类型名称
  identity_checked: function(e) {
    this.setData({
      identity_name: e.currentTarget.dataset.name,
      select_identity: false,
      identity_index: e.currentTarget.dataset.index,
      value: ""
    });
  },
  // 关闭缴款人信息
  cancleEven: function (e) {
    this.setData({
      cardDialog: false
    })
  }
})
