import store from "@/store";
import routes from "./routes";
import { createRouter, createWebHistory } from "vue-router";
import jwt_decode from "jwt-decode";
import { getUserImg } from "@/utils/axios";
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
        const data: IRouter_data = jwt_decode(localStorage.getItem("token"));
        store.state.user_data = data.data;
        const { id, userName } = store.state.user_data;
        getUrl({ id, userName });
      } else {
        // 若都未存在表明没有登录
        store.state.user_data = {
          id: -1,
          userName: "游客",
        };
        store.state.user_href =
          "http://localhost:8888/src/assets/defaultImgs/1.png";
      }
    } else {
      const { id, userName } = store.state.user_data;
      getUrl({ id, userName });
      // console.log("表示刷新页面但vuex值并没有消失");
    }
  }
});

async function getUrl({ id, userName }) {
  const res = await getUserImg({ id, user_name: userName });
  console.log(res.data.result.user_href);
  store.state.user_href =
    res.data.result.user_href ||
    "http://localhost:8888/src/assets/defaultImgs/1.png";
}

export default router;
