<script setup lang="ts">
import "./index.sass";
import { throttle } from "@/utils/Function/fangDou";
import { useRouter } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import store from "@/store";
import { ElMessage } from "element-plus";
import { SearchBokeList, getbokeList } from "@/utils/axios";
import Canvas_cicly_Round from "@/utils/canvas/canvas_oneMethod";
import Home_search from "@/assets/imgs/Home_search.png";
import Home_background from "@/assets/imgs/Home_background.jpg";
const router = useRouter();
let arrList = reactive<IVArrList>({
  value: [],
});

const keyWord = ref("");
const type = ref("");
const anthor = ref("");

/**
 * canvas画布
 */
let canvasDraw = null;

onMounted(() => {
  scrollBottom();
  bokeList();
  // canvasFunction();
});

// method
/**
 * 个人博客列表展示和搜索页面
 */
async function bokeList() {
  const parmas = {
    type: type.value,
    title: keyWord.value,
    user_name: anthor.value,
  };
  // const { data } = await SearchBokeList(parmas);
  const { data } = await getbokeList(parmas);
  if (data.message[0] === "success") {
    arrList.value = data.data;
  }
}

/**
 * 博客列表搜索
 */
async function bokeListSearch() {
  const parmas = {
    type: type.value,
    title: keyWord.value,
    user_name: anthor.value,
  };
  const { data } = await SearchBokeList(parmas);
  console.log(data);
  if (data.message === "success") {
    arrList.value = data.data;
  }
}

function enterDetails(v: string | number) {
  router.push({
    path: "/datil",
    query: {
      code: v,
    },
  });
}

function ourHome() {
  const { id } = store.state.user_data;
  if (id === -1) {
    ElMessage.error("目前为游客登录");
    router.push({
      path: "/land",
    });
    return;
  }
  router.push({
    path: "/OurInformation",
  });
}

function scrollBottom(): void {
  const div = document.querySelector(".ourself-right");
  div.addEventListener(
    "scroll",
    throttle(function () {
      const scrollHeight = this.scrollHeight;
      const scrollTop = this.scrollTop;
      const offsetHeight = this.offsetHeight;
      if (scrollHeight - scrollTop - offsetHeight < 100) {
      }
    }, 2000)
  );
}

function canvasFunction(): void {
  const options_cicly = {
    position: [
      [0, 200],
      [0, 200],
    ],
    size: 15,
    max_x_v: 5,
    max_y_v: 5,
    numbers: 100,
  };
  const canvas = new Canvas_cicly_Round(
    "canvas",
    ".canvasPartical",
    options_cicly
  );
  run();
  function run() {
    canvas.Cicly_action();
    window.requestAnimationFrame(run);
  }
}
</script>

<template>
  <div class="canvasPartical">
    <!-- <canvas id="canvas"></canvas> -->
    <div class="canvas">
      <img :src="Home_background" />
    </div>
  </div>
  <div class="home">
    <div class="ourself-left">
      <div class="outLine">
        <div class="left-title">
          <h2 class="title">
            Hi,{{ this.$store.state.user_data.userName || "游客" }}~
          </h2>
        </div>
        <div class="left-img">
          <img :src="store.state.user_href" />
          <div class="img-font">记录美好生活</div>
        </div>
        <div class="left-myself">
          <div class="myself-btn" @click="ourHome">个人主页</div>
        </div>
      </div>
    </div>
    <div class="ourself-center">
      <!-- search内容 -->
      <div class="right-bgi">
        <div class="bgi">
          <img :src="Home_search" />
        </div>
        <div class="right-search">
          <div class="search-flex">
            <div class="search">
              <input
                type="text"
                v-model="keyWord"
                placeholder="请输入想要搜索的内容"
              />
            </div>
            <div
              class="search-btn"
              @click="
                () => {
                  bokeListSearch();
                }
              "
            >
              搜索
            </div>
          </div>
        </div>
      </div>
      <!-- <h1 class="search-h1">SearchIng</h1> -->
      <!--  -->

      <!-- list内容 -->
      <div class="right-list">
        <div class="bodys" ref="bodys">
          <div
            class="list-information"
            v-for="(item, index) in arrList.value"
            :key="index"
            @click="
              () => {
                enterDetails(item.code);
              }
            "
          >
            <div class="information-text">
              <div class="information-left">
                <h2 class="information-text-title">{{ item.title }}</h2>
                <div class="information-text-nav">
                  作者：{{ item.user_name }}
                </div>
                <div
                  :style="{
                    display: 'flex',
                    paddingLeft: '10px',
                    marginTop: '10px',
                  }"
                ></div>
              </div>
              <div class="information-text-img"><img :src="item.image" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ourself-right">
      <div class="right-div">添加时钟功能</div>
    </div>
  </div>
</template>

<style scoped lang="sass">
#canvas
  background-color: white
  opacity:0.8
  position: fixed
  z-index: 1
</style>
