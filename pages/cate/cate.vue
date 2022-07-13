<template>
  <view>
    <view class="scroll-container">
      <!-- 左侧滚动 -->
      <scroll-view class="left-scroll-container" scroll-y="true" :style="{height: wh+'px'}">
        <block v-for="(item,index) in cateList" :key="item.cat_id">
          <view :class=" ['left-scroll-item', item.cat_id === active ? 'active' : '']"
            @click="activeChanged(item.cat_id,index)">
            {{item.cat_name}}
          </view>
        </block>

      </scroll-view>
      <!-- 右侧滚动 -->
      <scroll-view class="right-scroll-container" scroll-y="true" :style="{height: wh+ 'px'}" :scroll-top='scrollTop'>
        <!-- 二级列表 -->
        <view class=" cateLevel2" v-for="item in cateLevel2" :key="item.cat_id">
          <view class="cateLevel2-item">/{{item.cat_name}}/</view>
          <!-- 三级列表 -->
          <view class="cateLevel3">
            <view class="cateLevel3-list" v-for="(item2) in item.children" :key="item2.cat_id"
              @click="gotoGoodsList(item2)">
              <image :src="item2.cat_icon" mode=""></image>
              <view class="cateLevel3-item">{{item2.cat_name}}</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        wh: 0,
        //分类数据列表
        cateList: [],
        //默认active在第一个
        active: 0,
        //二级分类列表
        cateLevel2: [],
        // 滚动条距离顶部的距离
        scrollTop: 0
      };
    },
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      this.wh = sysInfo.windowHeight

      //获取分类数据列表
      this.getCateList()

    },
    methods: {
      //获取分类数据
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/categories')
        console.log(res);
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.cateList = res.message
        //获取二级分类列表
        this.cateLevel2 = res.message[0].children
        //获取默认active值
        this.active = res.message[0].cat_id

        // console.log(this.active);
      },

      //动态添加active类
      activeChanged(cat_id, index) {
        //获取对应的cat_id
        this.active = cat_id
        //重新获取二级分类列表
        this.cateLevel2 = this.cateList[index].children
        //重置滚动条位置
        this.scrollTop = this.scrollTop ? 0 : 1
        // console.log(this.cateLevel3);
      },
      //跳转到商品列表页面
      gotoGoodsList(item2) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + item2.cat_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .scroll-container {
    display: flex;

    .left-scroll-container {
      width: 120px;

      .left-scroll-item {
        line-height: 60px;
        background-color: #f7f7f7;
        text-align: center;
        font-size: 12px;

        &.active {
          background-color: #ffffff;
          position: relative;

          // 渲染激活项左侧的红色指示边线
          &::before {
            content: ' ';
            display: block;
            width: 3px;
            height: 30px;
            background-color: #c00000;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
    }

    .right-scroll-container {
      .cateLevel2 {
        .cateLevel2-item {
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          padding: 15px 0;
        }

        .cateLevel3 {
          display: flex;
          flex-wrap: wrap;

          .cateLevel3-list {
            width: 33.33%;
            margin-bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;

            image {
              width: 60px;
              height: 60px;
            }

            .cateLevel3-item {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
