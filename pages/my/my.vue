<template>
  <view class="my-container">
    <!-- 未登录时显示登录界面 -->
    <my-login v-if="!token"></my-login>
    <!-- 登录后显示用户页面 -->
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['token']),
    }
  }
</script>

<style lang="scss">
  page,
  .my-container {
    height: 100%;
    background-color: #fff;
  }
</style>
