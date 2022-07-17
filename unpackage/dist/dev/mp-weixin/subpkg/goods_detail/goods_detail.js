"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      goods_info: {},
      options: [{
        icon: "shop",
        text: "\u5E97\u94FA"
      }, {
        icon: "cart",
        text: "\u8D2D\u7269\u8F66",
        info: 0
      }],
      buttonGroup: [
        {
          text: "\u52A0\u5165\u8D2D\u7269\u8F66",
          backgroundColor: "#ff0000",
          color: "#fff"
        },
        {
          text: "\u7ACB\u5373\u8D2D\u4E70",
          backgroundColor: "#ffa200",
          color: "#fff"
        }
      ]
    };
  },
  onLoad(options) {
    const goods_id = options.goods_id;
    this.getGoodsDetail(goods_id);
  },
  methods: {
    async getGoodsDetail(goods_id) {
      const {
        data: res
      } = await common_vendor.index.$http.get("/api/public/v1/goods/detail", {
        goods_id
      });
      if (res.meta.status !== 200) {
        return common_vendor.index.$showMsg();
      }
      res.message.goods_introduce.replace(/<img /g, '<img style="display:block;"').replace(/webp/g, "jpg");
      this.goods_info = res.message;
      console.log(res);
    },
    preview(index) {
      common_vendor.index.previewImage({
        current: index,
        urls: this.goods_info.pics.map((x) => x.pics_big)
      });
    },
    onClick(e) {
      if (e.content.text === "\u8D2D\u7269\u8F66") {
        common_vendor.index.switchTab({
          url: "/pages/cart/cart"
        });
      }
    },
    buttonClick(e) {
      console.log(e);
      this.options[1].info++;
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  (_easycom_uni_icons2 + _easycom_uni_goods_nav2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_goods_nav = () => "../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_goods_nav)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.goods_info.goods_name
  }, $data.goods_info.goods_name ? {
    b: common_vendor.f($data.goods_info.pics, (item, index, i0) => {
      return {
        a: item.pics_big,
        b: common_vendor.o(($event) => $options.preview(index)),
        c: index
      };
    }),
    c: common_vendor.t($data.goods_info.goods_price),
    d: common_vendor.t($data.goods_info.goods_name),
    e: common_vendor.p({
      type: "star",
      size: "18",
      color: "gray"
    }),
    f: $data.goods_info.goods_introduce,
    g: common_vendor.o($options.onClick),
    h: common_vendor.o($options.buttonClick),
    i: common_vendor.p({
      fill: true,
      options: $data.options,
      buttonGroup: $data.buttonGroup
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Desktop/\u6587\u4EF6/web/\u9879\u76EE/uni-shop/subpkg/goods_detail/goods_detail.vue"]]);
wx.createPage(MiniProgramPage);
