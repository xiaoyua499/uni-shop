<template>
  <view class="search-box">
    <my-search @click="gotoSearch"></my-search>
  </view>
  <view>

    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
        <image class="nav-img" :src="item.image_src" mode=""></image>
      </view>
    </view>

    <!-- 楼层区域 -->
    <view class="foolr-list">
      <!-- 楼层标题 -->
      <view class="foolr-item" v-for="(item, index) in floorList" :key="index">
        <image class="floor-title" :src="item.floor_title.image_src"></image>

        <!-- 楼层图片 -->
        <view class="foolr-img-box">
          <!-- 左侧大图片区域 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
              mode="widthFix"></image>
          </navigator>
          <!-- 右侧小图片区域 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, index2) in item.product_list" :key="index2"
              v-show="index2 !== 0" :url="item2.url">
              <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //轮播图的数据列表
        swiperList: [],
        //分类导航数据列表
        navList: [],
        //获取楼层的数据列表
        floorList: [],
      };
    },
    onLoad() {
      //调用方法，获取轮播图数据
      this.getSwiperLish()
      //调用方法,获取分类导航数据
      this.getnavList()
      //调用方法,获取获取楼层的数据
      this.getfloorList()
    },
    methods: {
      //获取轮播图数据
      async getSwiperLish() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')

        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.swiperList = res.message
        // console.log(res.message);
      },

      //获取获取分类导航数据
      async getnavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        // console.log(res);

        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.navList = res.message
      },

      // 获取获取楼层的数据
      async getfloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        // console.log(res);

        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        //处理URL地址
        res.message.forEach((foolr) => {
          foolr.product_list.forEach((prod) => {
            prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
        // console.log(res.message);
      },

      //点击进入分类页面
      navClickHandler(item) {
        //判断是否点击分类
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      //跳转到搜索页面
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  // 轮播图
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  // 分类导航
  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  //楼层标题
  .foolr-list {
    .foolr-item {
      .floor-title {
        height: 60rpx;
        width: 100%;
        display: flex;
      }

      .foolr-img-box {
        display: flex;
        padding-left: 10rpx;

        .right-img-box {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
      }
    }
  }
</style>
