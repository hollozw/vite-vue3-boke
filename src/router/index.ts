import store from "@/store";
import routes from "./routes";
import { createRouter, createWebHistory } from "vue-router";
import jwt_decode from "jwt-decode";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

interface IRouter_data {
  data: {
    id: number;
    userName: string;
  };
  iat?: number;
}
router.beforeEach((to, form) => {
  if (to.path !== "/land" && to.path !== "/login") {
    if (store.state.user_data.id === -1) {
      if (localStorage.getItem("token")) {
        console.log("没有vuex情况");
        const data: IRouter_data = jwt_decode(localStorage.getItem("token"));
        store.state.user_data = data.data;
      } else {
        // 若都未存在表明没有登录
        console.log("该用户未登录");
        store.state.user_data = {
          id: -1,
          userName: "游客",
        };
      }
    } else {
      console.log("由vuex情况");
    }
  }
});

export default router;
