export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
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
