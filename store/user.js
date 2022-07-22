export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    //成功登录之后的token
    token: uni.getStorageSync('token') || '',
    //用户的基本信息
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    // 重定向的 object 对象 { openType, from }
    redirectInfo: null
  }),

  // 模块的 mutations 方法
  mutations: {
    //更新收货地址
    updataAddress(state, value) {
      state.address = value
      // 持久化存储到本地
      this.commit('m_user/saveToStorage')
    },
    //持久化存储被传过来的数据
    saveToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    //更新用户信息
    updataUserinfo(state, value) {
      state.userinfo = value
      //持续化存储到本地
      this.commit('m_user/saveUserInfoToStorage')
    },
    //持久化存储被传过来的用户数据
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    //更新token
    updateToken(state, token) {
      state.token = token
      // console.log(token);
      //持续化存储到本地
      this.commit('m_user/saveTokenToStorage')
    },
    // 将 token 字符串持久化存储到本地
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    //更新重定向信息的状态
    updataRedirectInfo(state, info) {
      state.redirectInfo = info
    }
  },

  // 模块的 getters 属性
  getters: {
    // 收货详细地址的计算属性
    addstr(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  },
}
