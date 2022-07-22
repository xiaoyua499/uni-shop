<template>
  <view>
    <!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
    </view>
    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="userName">
            收货人：<text>{{address.userName}}</text>
          </view>
        </view>
        <view class="row1-right">
          <view class="phone">
            电话：<text>{{address.telNumber}}</text>
          </view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">
          收货地址：
        </view>
        <view class="row2-right">
          {{addstr}}
        </view>
      </view>
    </view>
    <!-- 底部边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapGetters
  } from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {
        //收货地址
        // address: {},
      };
    },
    methods: {
      ...mapMutations('m_user', ['updataAddress']),
      // 选择收货地址
      async chooseAddress() {
        // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
        //    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
        const res = await uni.chooseAddress()
        // console.log(res);
        //2. 用户成功的选择了收货地址
        if (res.errMsg === 'chooseAddress:ok') {
          // 为 data 里面的收货地址对象赋值
          // this.address = res
          this.updataAddress(res)
          // console.log(this.address);
        }
        //用户没有授权
        if (res.errMsg === 'chooseAddress:fail auth deny' || res.errMsg ===
          'chooseAddress:fail authorize no response') {
          this.reAuth()
        }
      },

      //重新发起收货地址授权
      async reAuth() {
        //提示用户发起授权
        const [err2, confirmResult] = await uni.showModal({
          content: '检测到您没打开地址权限，是否去设置打开？',
          confirmText: '确认',
          cancelText: '取消'
        })
        //如果发生错误则直接退出
        if (err2) return
        //如果用户点击取消按钮
        if (confirmResult.cancel) return uni.showMsg('您取消了地址授权!!')
        //如果点击了确定按钮
        if (confirmResult.confirm) return uni.openSetting({
          success(settingResult) {
            //地址授权的值等于 true，提示用户 “授权成功”
            if (settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功！请选择地址')
            //地址授权的值等于 false，提示用户 “您取消了地址授权”
            if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
          }
        })
      }

    },
    computed: {
      ...mapState('m_user', ['address']),
      // 将 m_user 模块中的 addstr 映射到当前组件中使用
      ...mapGetters('m_user', ['addstr']),
    }
  }
</script>

<style lang="scss">
  // 底部边框线的样式
  .address-border {
    display: block;
    width: 100%;
    height: 5px;
  }

  // 选择收货地址的盒子
  .address-choose-box {
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // 渲染收货信息的盒子
  .address-info-box {
    font-size: 12px;
    height: 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;

    // 第一行
    .row1 {
      display: flex;
      justify-content: space-between;

      .row1-right {
        display: flex;
        align-items: center;

        .phone {
          margin-right: 5px;
        }
      }
    }

    // 第二行
    .row2 {
      display: flex;
      align-items: center;
      margin-top: 10px;

      .row2-left {
        white-space: nowrap;
      }
    }
  }
</style>
