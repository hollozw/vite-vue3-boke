import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user_data: { id: -1, userName: "游客" }, // 用户id信息
    };
  },
  mutations: {},
});

export default store;
