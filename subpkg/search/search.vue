<template>
  <!-- 搜索 -->
  <view class="search-box">
    <uni-search-bar @input="input" cancelButton="none" radius="100">
    </uni-search-bar>
  </view>
  <!-- 搜索结果列表 -->
  <view class="search-list-box" v-if="searchList.length !== 0">
    <view class="serach-list" v-for="(item,index) in searchList.goods" :key="index" @click="gotoDetail(item.goods_id)">
      <view class="goods-name">
        {{item.goods_name}}
      </view>
      <uni-icons type="arrowright" size="16"></uni-icons>
    </view>
  </view>
  <!-- 历史记录 -->
  <view class="history-list-box" v-else>
    <view class="history-list-title">
      <text>搜索历史</text>
      <uni-icons @click="cleanHistory" type="trash" size="17"></uni-icons>
    </view>
    <view class="history-list">
      <uni-tag :text="item" v-for="(item,index) in historys" :key="index" circle="true" @click="gotoGoodsList(item)">
      </uni-tag>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //延时时间
        timer: null,
        //搜索关键字
        value: '',
        //搜索列表
        searchList: [],
        //历史记录
        historyList: [],

      };
    },
    methods: {
      input(e) {
        //清除定时器
        clearTimeout(this.timer)
        // console.log(e);
        //启动定时器
        this.timer = setTimeout(() => {
          //如果500ms没有触发写的事件就将数据写入
          this.value = e
          // console.log(this.value);
          this.getSearchList()
        }, 500)
      },
      async getSearchList() {
        //判断输入的之是否为空
        if (this.value === '') {
          this.searchList = []
          return
        }
        //获取返回的数据列表
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', {
          query: this.value
        })
        if (res.meta.status !== 200) return uni.showMsg()
        this.searchList = res.message
        console.log(this.searchList)
        this.saveSearchHistory()
      },
      //点击搜索建议的 Item 项，跳转到商品详情页面
      gotoDetail(goods_id) {
        // console.log(goods_id);
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      //将搜索的关键字添加到历史记录
      saveSearchHistory() {
        // this.historyList.push(this.value)
        //历史记录去重
        const set = new Set(this.historyList)
        set.delete(this.value)
        set.add(this.value)
        this.historyList = Array.from(set)
        uni.setStorageSync('history', JSON.stringify(this.historyList))
      },
      //点击清空历史记录
      cleanHistory() {
        this.historyList = []
        uni.setStorageSync('history', [])
      },
      //点击历史记录跳转商品列表页面
      gotoGoodsList(value) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + value
        })
      }
    },
    computed: {
      historys() {
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('history') || [])
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .search-list-box {
    padding: 0 5px;

    .serach-list {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-list-box {
    padding: 0 5px;

    .history-list-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      font-size: 13px;
      border-bottom: 1px solid #efefef;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
