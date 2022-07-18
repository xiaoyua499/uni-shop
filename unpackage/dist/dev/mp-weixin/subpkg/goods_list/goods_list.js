"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      queryObj: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10
      },
      goodsList: [],
      totaol: 0,
      isloading: false
    };
  },
  onLoad(options) {
    this.queryObj.query = options.query || "";
    this.queryObj.cid = options.cid || "";
    this.getGoodsList();
  },
  methods: {
    async getGoodsList(cb) {
      this.isloading = true;
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/goods/search", this.queryObj);
      this.isloading = false;
      cb && cb();
      if (res.meta.status !== 200) {
        return common_vendor.index.$showMsg();
      }
      this.goodsList = [...this.goodsList, ...res.message.goods];
      this.totaol = res.message.totaol;
      console.log(this.goodsList);
    },
    gotoDetail(value) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + value.goods_id
      });
    }
  },
  onReachBottom() {
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
      return common_vendor.index.$showMsg("\u5DF2\u7ECF\u5230\u5E95\u5566\uFF01\uFF01\uFF01");
    if (this.isloading)
      return;
    this.queryObj.pagenum += 1;
    this.getGoodsList();
  },
  onPullDownRefresh() {
    this.queryObj.pagenum = 1;
    this.totaol = 0;
    this.goodsList = [];
    this.isloading = false;
    this.getGoodsList(() => common_vendor.index.stopPullDownRefresh());
  }
};
if (!Array) {
  const _easycom_my_goods2 = common_vendor.resolveComponent("my-goods");
  _easycom_my_goods2();
}
const _easycom_my_goods = () => "../../components/my-goods/my-goods.js";
if (!Math) {
  _easycom_my_goods();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.goodsList, (item, index, i0) => {
      return {
        a: "e34b0caa-0-" + i0,
        b: common_vendor.p({
          goods: item
        }),
        c: index,
        d: common_vendor.o(($event) => $options.gotoDetail(item))
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Desktop/\u6587\u4EF6/web/\u9879\u76EE/uni-shop/subpkg/goods_list/goods_list.vue"]]);
wx.createPage(MiniProgramPage);
