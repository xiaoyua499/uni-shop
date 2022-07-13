"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/home/home.js";
  "./pages/cate/cate.js";
  "./pages/cart/cart.js";
  "./pages/my/my.js";
  "./subpkg/goods_detail/goods_detail.js";
  "./subpkg/goods_list/goods_list.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("\u5F53\u524D\u7EC4\u4EF6\u4EC5\u652F\u6301 uni_modules \u76EE\u5F55\u7ED3\u6784 \uFF0C\u8BF7\u5347\u7EA7 HBuilderX \u5230 3.1.0 \u7248\u672C\u4EE5\u4E0A\uFF01");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/Desktop/\u6587\u4EF6/web/\u9879\u76EE/uni-shop/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
common_vendor.index.$http = common_vendor.$http;
common_vendor.$http.baseUrl = "https://www.uinav.com";
common_vendor.$http.beforeRequest = function(options) {
  common_vendor.index.showLoading({
    title: "\u6570\u636E\u52A0\u8F7D\u4E2D..."
  });
};
common_vendor.$http.afterRequest = function() {
  common_vendor.index.hideLoading();
};
common_vendor.index.$showMsg = function(title = "\u6570\u636E\u8BF7\u6C42\u5931\u8D25\uFF01", duration = 1500) {
  common_vendor.index.showToast({
    title,
    duration,
    icon: "none"
  });
};
createApp().app.mount("#app");
exports.createApp = createApp;
