"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      wh: 0,
      cateList: [],
      active: 0,
      cateLevel2: [],
      scrollTop: 0
    };
  },
  onLoad() {
    const sysInfo = common_vendor.index.getSystemInfoSync();
    this.wh = sysInfo.windowHeight - 50;
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/categories");
      if (res.meta.status !== 200) {
        return common_vendor.index.$showMsg();
      }
      this.cateList = res.message;
      this.cateLevel2 = res.message[0].children;
      this.active = res.message[0].cat_id;
    },
    activeChanged(cat_id, index) {
      this.active = cat_id;
      this.cateLevel2 = this.cateList[index].children;
      this.scrollTop = this.scrollTop ? 0 : 1;
    },
    gotoGoodsList(item2) {
      common_vendor.index.navigateTo({
        url: "/subpkg/goods_list/goods_list?cid=" + item2.cat_id
      });
    },
    gotoSearch() {
      common_vendor.index.navigateTo({
        url: "/subpkg/search/search"
      });
    }
  }
};
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search2.js";
if (!Math) {
  _easycom_my_search();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.gotoSearch),
    b: common_vendor.f($data.cateList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.cat_name),
        b: common_vendor.n(item.cat_id === $data.active ? "active" : ""),
        c: common_vendor.o(($event) => $options.activeChanged(item.cat_id, index)),
        d: item.cat_id
      };
    }),
    c: $data.wh + "px",
    d: common_vendor.f($data.cateLevel2, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.cat_name),
        b: common_vendor.f(item.children, (item2, k1, i1) => {
          return {
            a: item2.cat_icon,
            b: common_vendor.t(item2.cat_name),
            c: item2.cat_id,
            d: common_vendor.o(($event) => $options.gotoGoodsList(item2), item2.cat_id)
          };
        }),
        c: item.cat_id
      };
    }),
    e: $data.wh + "px",
    f: $data.scrollTop
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Desktop/\u6587\u4EF6/web/\u9879\u76EE/uni-shop/pages/cate/cate.vue"]]);
wx.createPage(MiniProgramPage);
