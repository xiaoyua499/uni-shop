<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['redirectInfo']),
    },
    methods: {
      ...mapMutations('m_user', ['updataUserinfo', 'updateToken', 'updataRedirectInfo']),
      // 获取微信用户的基本信息
      async getUserProfile() {
        const res = await uni.getUserProfile({
          desc: '获取授权信息',
        }).catch(err => err)
        //判断是否登录成功
        if (res.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('您取消了登录授权！')
        // 将用户的基本信息存储到 vuex 中
        this.updataUserinfo(res.userInfo)
        // 获取登录成功后的 Token 字符串
        this.getToken(res)
        // console.log(res);
      },
      //调用登录接口获取token
      async getToken(info) {
        // 调用微信登录接口
        const res = await uni.login().catch(err => err)
        if (!res.errMsg === 'login: ok') return uni.$showMsg('登录失败！')
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // console.log(query);
        //获取token
        const {
          data: loginResult
        } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
        // console.log(loginResult);
        if (loginResult.meta.status !== 200) {
          if (loginResult.meta.status === 400) {
            loginResult.token =
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
            this.updateToken(loginResult.token)
            // 判断 vuex 中的 redirectInfo 是否为 null
            // 如果不为 null，则登录成功之后，需要重新导航到对应的页面
            this.navigateBack()
            return uni.$showMsg('登录成功')
          }
          return uni.$showMsg('登录失败！')
        }

      },
      // 返回登录之前的页面
      navigateBack() {
        // redirectInfo 不为 null，并且导航方式为 switchTab
        if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
            complete: () => {
              this.updataRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 750rpx;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 40px;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
