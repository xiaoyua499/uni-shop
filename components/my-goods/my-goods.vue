<template>
  <view>
    <view class="goods-item">
      <!-- 左侧图片 -->
      <view class="goods-item-left">
        <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
        <image class="goods-pic" :src="goods.goods_small_logo || defaultPic" mode=""></image>
      </view>
      <!-- 右侧信息区 -->
      <view class="goods-item-right">
        <!-- 商品标题 -->
        <view class="goods-name">
          {{goods.goods_name}}
        </view>
        <!-- 商品价格 -->
        <view class="goods-info-box">
          <view class="goods-price">
            ￥{{goods.goods_price.toFixed(2)}}
          </view>
          <!-- 商品数量 -->
          <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler">
          </uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    //接收外部传来的数据
    props: {
      goods: {
        type: Object,
        default: {},
      },
      //是否展示radio标签
      showRadio: {
        type: Boolean,
        default: false,
      },
      //是否展示number-box
      showNum: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        //默认商品图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    methods: {
      // radio 组件的点击事件处理函数
      radioClickHandler() {
        // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      numChangeHandler(val) {
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          goods_count: +val,
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    // 让 goods-item 项占满整个屏幕的宽度
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .goods-price {
          font-size: 16px;
          color: #c00000;
        }
      }


    }
  }
</style>
