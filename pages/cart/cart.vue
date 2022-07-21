<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 收货地址 -->
    <my-address></my-address>

    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <uni-swipe-action>
      <view v-for="(item,index) in cart" :key="index">
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
          <my-goods :goods="item" :show-radio="true" @radio-change="radioChangeHandler" :show-num="true"
            @num-change="numberChangeHandler">
          </my-goods>
        </uni-swipe-action-item>
      </view>
    </uni-swipe-action>
    <!-- 结算页面 -->
    <my-settle></my-settle>
  </view>
  <!-- 空白购物车区域 -->
  <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }]
      };
    },
    onShow() {
      this.setBadge()
    },
    onLoad() {
      // console.log(this.cart);
    },
    computed: {
      ...mapGetters('m_cart', ['total']),
      ...mapState('m_cart', ['cart'])
    },
    watch: {
      total(newVal) {
        this.setBadge()
      }
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      setBadge() {
        uni.setTabBarBadge({
          index: 2,
          text: this.total + ''
        })
      },
      //获取当前商品的 goods_id 和 goods_state
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      //获取当前商品的 goods_id 和 goods_count
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      swipeActionClickHandler(goods) {
        this.removeGoodsById(goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .cart-title {
    display: flex;
    align-items: center;
    padding-left: 5px;
    height: 40px;
    border-bottom: 1px solid #efefef;
    font-size: 14px;

    .cart-title-text {
      margin-left: 10pxs;
    }
  }

  .cart-container {
    padding-bottom: 50px;
  }

  //空白购物车
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;

    .empty-img {
      width: 90px;
      height: 90px;
    }

    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
