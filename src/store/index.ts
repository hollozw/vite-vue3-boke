import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      user_data: { id: -1, userName: "游客" }, // 用户id信息
      user_href: "http://localhost:8888/src/assets/defaultImgs/1.png", // 用户id信息
    };
  },
  mutations: {},
});

export default store;
