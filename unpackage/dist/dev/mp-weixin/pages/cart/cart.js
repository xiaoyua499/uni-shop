"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      options: [{
        text: "\u5220\u9664",
        style: {
          backgroundColor: "#dd524d"
        }
      }]
    };
  },
  onShow() {
    this.setBadge();
  },
  onLoad() {
  },
  computed: __spreadValues(__spreadValues({}, common_vendor.mapGetters("m_cart", ["total"])), common_vendor.mapState("m_cart", ["cart"])),
  watch: {
    total(newVal) {
      this.setBadge();
    }
  },
  methods: __spreadProps(__spreadValues({}, common_vendor.mapMutations("m_cart", ["updateGoodsState", "updateGoodsCount", "removeGoodsById"])), {
    setBadge() {
      common_vendor.index.setTabBarBadge({
        index: 2,
        text: this.total + ""
      });
    },
    radioChangeHandler(e) {
      this.updateGoodsState(e);
    },
    numberChangeHandler(e) {
      this.updateGoodsCount(e);
    },
    swipeActionClickHandler(goods) {
      this.removeGoodsById(goods.goods_id);
    }
  })
};
if (!Array) {
  const _easycom_my_address2 = common_vendor.resolveComponent("my-address");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_my_goods2 = common_vendor.resolveComponent("my-goods");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  const _easycom_my_settle2 = common_vendor.resolveComponent("my-settle");
  (_easycom_my_address2 + _easycom_uni_icons2 + _easycom_my_goods2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2 + _easycom_my_settle2)();
}
const _easycom_my_address = () => "../../components/my-address/my-address.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_my_goods = () => "../../components/my-goods/my-goods.js";
const _easycom_uni_swipe_action_item = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
const _easycom_my_settle = () => "../../components/my-settle/my-settle.js";
if (!Math) {
  (_easycom_my_address + _easycom_uni_icons + _easycom_my_goods + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action + _easycom_my_settle)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.cart.length !== 0
  }, _ctx.cart.length !== 0 ? {
    b: common_vendor.p({
      type: "shop",
      size: "18"
    }),
    c: common_vendor.f(_ctx.cart, (item, index, i0) => {
      return {
        a: "069a6915-4-" + i0 + "," + ("069a6915-3-" + i0),
        b: common_vendor.p({
          goods: item,
          ["show-radio"]: true,
          ["show-num"]: true
        }),
        c: common_vendor.o(($event) => $options.swipeActionClickHandler(item)),
        d: "069a6915-3-" + i0 + ",069a6915-2",
        e: index
      };
    }),
    d: common_vendor.o($options.radioChangeHandler),
    e: common_vendor.o($options.numberChangeHandler),
    f: common_vendor.p({
      ["right-options"]: $data.options
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/Desktop/\u6587\u4EF6/web/\u9879\u76EE/uni-shop/pages/cart/cart.vue"]]);
wx.createPage(MiniProgramPage);
