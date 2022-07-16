<template>
  <view>
    <view class="goods-item">
      <!-- 左侧图片 -->
      <view class="goods-item-left">
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
      }
    },
    data() {
      return {
        //默认商品图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>
