<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
    </label>
    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>

    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {
        // 倒计时的秒数
        seconds: 3,
        // 定时器的 Id
        timer: null
      };
    },
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total',
        'checkedGoodsAmount'
      ]),
      ...mapGetters('m_user', ['addstr']),
      ...mapState('m_user', ['token']),
      ...mapState('m_cart', ['cart']),
      //判断是否全选
      isFullCheck() {
        return this.total === this.checkedCount
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      ...mapMutations('m_user', ['updataRedirectInfo']),
      // label 的点击事件处理函数
      changeAllState() {
        this.updateAllGoodsState(!this.isFullCheck)
        // console.log(this.isFullCheck);
      },
      //点击结算按钮
      settlement() {
        //判断是否勾选了结算按钮
        if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品!')
        //判断是否选择了收货地址
        if (!this.addstr) return uni.$showMsg('请选择收货地址！')
        //判断是否登录
        if (!this.token) return this.delayNavigate()
        //实现微信支付
        this.payOrder()
      },
      // 展示倒计时的提示消息
      showTips(n) {
        uni.showToast({
          icon: 'none',
          title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
          mask: true,
          duration: 1500
        })
      },
      // 延迟导航到 my 页面
      delayNavigate() {
        //重置倒计时
        this.seconds = 3
        //展示提示消息
        this.showTips(this.seconds)
        //创建定时器
        this.timer = setInterval(() => {
          this.seconds--
          if (this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: '/pages/my/my',
              // 页面跳转成功之后的回调函数
              success: () => {
                // 调用 vuex 的 updataRedirectInfo 方法，把跳转信息存储到 Store 中
                this.updataRedirectInfo({
                  // 跳转的方式
                  openType: 'switchTab',
                  // 从哪个页面跳转过去的
                  from: '/pages/cart/cart'
                })
              }
            })
            return
          }
          this.showTips(this.seconds)
        }, 1000)
      },
      //微信支付函数
      async payOrder() {
        //创建订单
        //组织订单的信息对象
        const orderInfo = {
          // 开发期间，注释掉真实的订单价格，
          // order_price: this.checkedGoodsAmount,
          // 写死订单总价为 1 分钱
          order_price: 0.01,
          consignee_addr: this.addstr,
          goods: this.cart.filter(x => x.goods_state).map(x => ({
            goods_id: x.goods_id,
            goods_number: x.goods_count,
            goods_price: x.goods_price
          }))
        }
        //发起请求创建订单
        const {
          data: res
        } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
        if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
        // 1.3 得到服务器响应的“订单编号”
        const orderNumber = res.message.order_number
        // console.log(orderNumber);
        //订单预支付
        //发起请求获取订单的支付信息
        const {
          data: res2
        } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', {
          order_number: orderNumber
        })
        if (res.meta.status !== 200) return uni.$showMsg('预付订单生成失败！')
        const payInfo = res2.message.pay
        console.log(payInfo);
        //发起微信支付
        //调用 uni.requestPayment() 发起微信支付
        const [err, succ] = await uni.requestPayment({
          provider: 'wxpay',
          timeStamp: payInfo.timeStamp,
          nonceStr: payInfo.nonceStr,
          package: payInfo.package,
          signType: payInfo.signType,
          paySign: payInfo.paySign,
        })
        if (err) return uni.$showMsg('订单未支付！')
        // 3.3 完成了支付，进一步查询支付的结果
        const {
          data: res3
        } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', {
          order_number: orderNumber
        })
        // 3.4 检测到订单未支付
        if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
        // 3.5 检测到订单支付完成
        uni.showToast({
          title: '支付完成！',
          icon: 'success'
        })
      }
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    //底部固定定位
    position: fixed;
    bottom: 0;
    left: 0;
    //设置宽高和背景色
    width: 100%;
    height: 50px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    font-size: 14px;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount {
      color: #c00000;
    }

    .btn-settle {
      height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
    }
  }
</style>
