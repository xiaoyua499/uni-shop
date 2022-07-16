"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      swiperList: [],
      navList: [],
      floorList: []
    };
  },
  onLoad() {
    this.getSwiperLish();
    this.getnavList();
    this.getfloorList();
  },
  methods: {
    async getSwiperLish() {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/home/swiperdata");
      if (res.meta.status !== 200) {
        return common_vendor.index.$showMsg();
      }
      this.swiperList = res.message;
    },
    async getnavList() {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/home/catitems");
      if (res.meta.status !== 200) {
        return common_vendor.index.$showMsg();
      }
      this.navList = res.message;
    },
    async getfloorList() {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/home/floordata");
      if (res.meta.status !== 200) {
        return common_vendor.index.$showMsg();
      }
      res.message.forEach((foolr) => {
        foolr.product_list.forEach((prod) => {
          prod.url = "/subpkg/goods_list/goods_list?" + prod.navigator_url.split("?")[1];
        });
      });
      this.floorList = res.message;
    },
    navClickHandler(item) {
      if (item.name === "\u5206\u7C7B") {
        common_vendor.index.switchTab({
          url: "/pages/cate/cate"
        });
      }
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
    b: common_vendor.f($data.swiperList, (item, i, i0) => {
      return {
        a: item.image_src,
        b: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id,
        c: i
      };
    }),
    c: common_vendor.f($data.navList, (item, index, i0) => {
      return {
        a: item.image_src,
        b: index,
        c: common_vendor.o(($event) => $options.navClickHandler(item))
      };
    }),
    d: common_vendor.f($data.floorList, (item, index, i0) => {
      return {
        a: item.floor_title.image_src,
        b: item.product_list[0].image_src,
        c: item.product_list[0].image_width + "rpx",
        d: item.product_list[0].url,
        e: common_vendor.f(item.product_list, (item2, index2, i1) => {
          return {
            a: item2.image_src,
            b: item2.image_width + "rpx",
            c: index2,
            d: index2 !== 0,
            e: item2.url
          };
        }),
        f: index
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Desktop/\u6587\u4EF6/web/\u9879\u76EE/uni-shop/pages/home/home.vue"]]);
wx.createPage(MiniProgramPage);
