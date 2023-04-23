import {createStore} from 'vuex'

const store = createStore({
  state(){
    return {
      id: 0 // 用户id信息
    }
  },
  mutations: {
    idChang(state) {
      state.id++
    }
  }
})

export default store