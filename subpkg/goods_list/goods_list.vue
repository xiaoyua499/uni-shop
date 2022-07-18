<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,index) in goodsList" :key="index" @click="gotoDetail(item)">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //请求参数对象
        queryObj: {
          //查询关键词
          query: '',
          //商品分类id
          cid: '',
          //页值码
          pagenum: 1,
          //每页显示数据数
          pagesize: 10
        },
        //商品数据列表
        goodsList: [],
        //总数量，实现分页
        totaol: 0,
        //是否正在请求数据
        isloading: false

      };
    },
    onLoad(options) {
      //将页面传过来的数据转存
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      //获取商品列表与总数量
      this.getGoodsList()
    },
    methods: {
      //获取商品列表与总数量
      async getGoodsList(cb) {
        // console.log(this.queryObj);
        //打开节流阀
        this.isloading = true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        //关闭节流阀
        this.isloading = false
        //判断是否有停止下拉刷新的回调函数，如果没有则跳过
        cb && cb()
        //判断数据是否获取成功
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        //将新旧数据拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.totaol = res.message.totaol
        console.log(this.goodsList);
      },
      //点击商品跳转到商品详情页面
      gotoDetail(value) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + value.goods_id
        })
      }
    },
    //上拉加载更多页面
    onReachBottom() {
      //判断是否加载完全部数据
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('已经到底啦！！！')
      //判断是否正在获取数据
      if (this.isloading) return
      //页码加一
      this.queryObj.pagenum += 1
      //重新获取列表数据
      this.getGoodsList()
    },
    //下拉刷新
    onPullDownRefresh() {
      //重置数据
      this.queryObj.pagenum = 1
      this.totaol = 0
      this.goodsList = []
      this.isloading = false
      //重新获取数据
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">

</style>
