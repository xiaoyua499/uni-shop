<template>
  <view>
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
</style>
