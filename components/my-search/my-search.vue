<template>
  <view class="my-search" :style="{'background-color':bgcolor}">
    <view class="my-search-box" :style="{'border-radius':radius+'px'}" @click="searchBoxHandler">
      <uni-icons type="search" size="30"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-search",
    props: {
      //背景颜色
      bgcolor: {
        type: String,
        default: '#C00000'
      },
      //圆角尺寸
      radius: {
        type: Number,
        default: 18 //px
      }
    },
    data() {
      return {

      };
    },
    methods: {
      searchBoxHandler() {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
  .my-search {
    // background-color: #c00000;
    height: 50px;
    padding: 0 10px;
    display: flex;
    align-items: center;

    .my-search-box {
      height: 36px;
      background-color: #ffffff;
      // border-radius: 15px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
</style>
