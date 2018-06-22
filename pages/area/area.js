// pages/area/area.js
const area_list = [{
  "id": "610000",
  "name": "陕西省",
  "city": [{
    "id": "610100",
    "name": "西安市",
    "area": [{
      "id": "610101",
      "name": "市本级"
    }, {
      "id": "610102",
      "name": "新城区"
    }, {
      "id": "610103",
      "name": "碑林区"
    }, {
      "id": "610104",
      "name": "莲湖区"
    }, {
      "id": "610111",
      "name": "灞桥区"
    }, {
      "id": "610112",
      "name": "未央区"
    }, {
      "id": "610113",
      "name": "雁塔区"
    }, {
      "id": "610114",
      "name": "阎良区"
    }, {
      "id": "610115",
      "name": "临潼区"
    }, {
      "id": "610116",
      "name": "长安区"
    }, {
      "id": "610117",
      "name": "高陵区"
    }, {
      "id": "610122",
      "name": "蓝田县"
    }, {
      "id": "610124",
      "name": "周至县"
    }, {
      "id": "610125",
      "name": "户县"
    }]
  },
  {
    "id": "610200",
    "name": "铜川市",
    "area": [
      {
        "id": "610201",
        "name": "市辖区"
      }, {
        "id": "610202",
        "name": "王益区"
      }, {
        "id": "610203",
        "name": "印台区"
      }, {
        "id": "610204",
        "name": "耀州区"
      }, {
        "id": "610222",
        "name": "宜君县"
      }
    ]
  },
  {
    "id": "610300",
    "name": "宝鸡市",
    "area": [
      {
        "id": "610301",
        "name": "市辖区"
      },
      {
        "id": "610302",
        "name": "渭滨区"
      },
      {
        "id": "610303",
        "name": "金台区"
      },
      {
        "id": "610304",
        "name": "陈仓区"
      },
      {
        "id": "610322",
        "name": "凤翔县"
      },
      {
        "id": "610323",
        "name": "岐山县"
      },
      {
        "id": "610324",
        "name": "扶风县"
      },
      {
        "id": "610326",
        "name": "眉县"
      },
      {
        "id": "610327",
        "name": "陇县"
      },
      {
        "id": "610328",
        "name": "千阳县"
      },
      {
        "id": "610329",
        "name": "麟游县"
      },
      {
        "id": "610330",
        "name": "凤县"
      },
      {
        "id": "610331",
        "name": "太白县"
      }
    ]
  },
  {
    "id": "610400",
    "name": "咸阳市",
    "area": [
      {
        "id": "610401",
        "name": "市辖区"
      },
      {
        "id": "610402",
        "name": "秦都区"
      },
      {
        "id": "610403",
        "name": "杨陵区"
      },
      {
        "id": "610404",
        "name": "渭城区"
      },
      {
        "id": "610422",
        "name": "三原县"
      },
      {
        "id": "610423",
        "name": "泾阳县"
      },
      {
        "id": "610424",
        "name": "乾县"
      },
      {
        "id": "610425",
        "name": "礼泉县"
      },
      {
        "id": "610426",
        "name": "永寿县"
      },
      {
        "id": "610427",
        "name": "彬县"
      },
      {
        "id": "610428",
        "name": "长武县"
      },
      {
        "id": "610429",
        "name": "旬邑县"
      },
      {
        "id": "610430",
        "name": "淳化县"
      },
      {
        "id": "610431",
        "name": "武功县"
      },
      {
        "id": "610481",
        "name": "兴平市"
      }
    ]
  },
  {
    "id": "610500",
    "name": "渭南市",
    "area": [
      {
        "id": "610501",
        "name": "市辖区"
      },
      {
        "id": "610502",
        "name": "临渭区"
      },
      {
        "id": "610503",
        "name": "华州区",
      },
      {
        "id": "610522",
        "name": "潼关县",
      },
      {
        "id": "610523",
        "name": "大荔县",
      },
      {
        "id": "610524",
        "name": "合阳县",
      },
      {
        "id": "610525",
        "name": "澄城县",
      },
      {
        "id": "610526",
        "name": "蒲城县",
      },
      {
        "id": "610527",
        "name": "白水县",
      },
      {
        "id": "610528",
        "name": "富平县",
      },
      {
        "id": "610581",
        "name": "韩城市",
      },
      {
        "id": "610582",
        "name": "华阴市"
      }
    ]
  },
  {
    "id": "610600",
    "name": "延安市",
    "area": [
      {
        "id": "610601",
        "name": "市辖区",
      },
      {
        "id": "610602",
        "name": "宝塔区",
      },
      {
        "id": "610603",
        "name": "安塞区",
      },
      {
        "id": "610621",
        "name": "延长县",
      },
      {
        "id": "610622",
        "name": "延川县",
      },
      {
        "id": "610623",
        "name": "子长县",
      },
      {
        "id": "610625",
        "name": "志丹县",
      },
      {
        "id": "610626",
        "name": "吴起县",
      },
      {
        "id": "610627",
        "name": "甘泉县",
      },
      {
        "id": "610628",
        "name": "富县",
      },
      {
        "id": "610629",
        "name": "洛川县",
      },
      {
        "id": "610630",
        "name": "宜川县",
      },
      {
        "id": "610631",
        "name": "黄龙县",
      },
      {
        "id": "610632",
        "name": "黄陵县"
      }
    ]
  },
  {
    "id": "610700",
    "name": "汉中市",
    "area": [
      {
        "id": "610701",
        "name": "市辖区",
      },
      {
        "id": "610702",
        "name": "汉台区",
      },
      {
        "id": "610721",
        "name": "南郑县",
      },
      {
        "id": "610722",
        "name": "城固县",
      },
      {
        "id": "610723",
        "name": "洋县",
      },
      {
        "id": "610724",
        "name": "西乡县",
      },
      {
        "id": "610725",
        "name": "勉县",
      },
      {
        "id": "610726",
        "name": "宁强县",
      },
      {
        "id": "610727",
        "name": "略阳县",
      },
      {
        "id": "610728",
        "name": "镇巴县",
      },
      {
        "id": "610729",
        "name": "留坝县",
      },
      {
        "id": "610730",
        "name": "佛坪县"
      }
    ]
  },
  {
    "id": "610800",
    "name": "榆林市",
    "area": [
      {
        "id": "610801",
        "name": "市辖区",
      },
      {
        "id": "6108002",
        "name": "榆阳区",
      },
      {
        "id": "610803",
        "name": "横山区",
      },
      {
        "id": "610821",
        "name": "神木县",
      },
      {
        "id": "610822",
        "name": "府谷县",
      },
      {
        "id": "610824",
        "name": "靖边县",
      },
      {
        "id": "610825",
        "name": "定边县",
      },
      {
        "id": "610826",
        "name": "绥德县",
      },
      {
        "id": "610827",
        "name": "米脂县",
      },
      {
        "id": "610828",
        "name": "佳县",
      },
      {
        "id": "610829",
        "name": "吴堡县",
      },
      {
        "id": "610830",
        "name": "清涧县",
      },
      {
        "id": "610831",
        "name": "子洲县"
      }
    ]
  },
  {
    "id": "610900",
    "name": "安康市",
    "area": [
      {
        "id": "610901",
        "name": "市辖区",
      },
      {
        "id": "610902",
        "name": "汉滨区",
      },
      {
        "id": "610921",
        "name": "汉阴县",
      },
      {
        "id": "610922",
        "name": "石泉县",
      },
      {
        "id": "610923",
        "name": "宁陕县",
      },
      {
        "id": "610924",
        "name": "紫阳县",
      },
      {
        "id": "610925",
        "name": "岚皋县",
      },
      {
        "id": "610926",
        "name": "平利县",
      },
      {
        "id": "610927",
        "name": "镇坪县",
      },
      {
        "id": "610928",
        "name": "旬阳县",
      },
      {
        "id": "610929",
        "name": "白河县"
      }
    ]
  },
  {
    "id": "611000",
    "name": "商洛市",
    "area": [
      {
        "id": "611001",
        "name": "市辖区",
      },
      {
        "id": "611002",
        "name": "商州区",
      },
      {
        "id": "611021",
        "name": "洛南县",
      },
      {
        "id": "611022",
        "name": "丹凤县",
      },
      {
        "id": "611023",
        "name": "商南县",
      },
      {
        "id": "611024",
        "name": "山阳县",
      },
      {
        "id": "611025",
        "name": "镇安县",
      },
      {
        "id": "611026",
        "name": "柞水县"
      }
    ]
  }]
}];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area: area_list,
    qu_area: "", // 市级列表
    on_show: "", // 市级id
    city_name: "", // 市级名字
    area_id: "",  // 区id
    area_name: "" // 区名字
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {

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
  // 选择市联动区
  cityTap: function (e) {
    this.setData({
      qu_area: e.target.dataset.area
    });
    for (var i = 0; i < this.data.area.length; i++) {
      for (var j = 0; j < this.data.area[i].city.length; j++) {
        if (this.data.area[i].city[j].id === e.target.dataset.id) {
          this.setData({
            on_show: e.target.dataset.id,
            city_name: e.target.dataset.name
          });
        }
      }
    }
  },
  // 选择区
  areaTap: function (e) {
    this.setData({
      area_id: e.target.dataset.id,
      area_name: e.target.dataset.name
    });
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    let currentPage = pages[pages.length - 1];//本页
    prevPage.setData({//直接给上移页面赋值
      item: currentPage.data
    });
    // console.log(prevPage);
    // console.log(currentPage);
    wx.navigateBack({
      url: '../index/index?city=' + this.data.on_show + "&area=" + this.data.area_id
    });
  }
})