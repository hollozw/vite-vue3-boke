<script setup lang="ts">
import "./index.sass";
import { throttle } from "@/utils/Function/fangDou";
import TouXiang from "@/assets/imgs/title.jpg";
import searchBgc from "@/assets/imgs/home-sreach-bgi.jpg";
import { useRouter } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import store from "@/store";
import { ElMessage } from "element-plus";
import { bokeList } from "@/utils/axios";
const router = useRouter();
const arrList = reactive<Array<IArrList>>([
  { code: 1, title: "标题1", nav: "内容1", image: "图像1" },
  { code: 2, title: "标题2", nav: "内容2", image: "图像2" },
  { code: 3, title: "标题3", nav: "内容3", image: "图像3" },
  { code: 4, title: "标题4", nav: "内容4", image: "图像4" },
  { code: 5, title: "标题5", nav: "内容5", image: "图像5" },
]);
const keyWord = ref("");
const typeNumber = ref("");
const people = ref("");

onMounted(() => {
  scrollBottom();
  bokeListSearch();
  console.log(store.state.user_data)
});

// method
/**
 * 个人博客列表展示和搜索页面
 */
async function bokeListSearch() {
  const parmas = {
    typeNumber: typeNumber.value,
    keyWord: keyWord.value,
    people: people.value,
  };
  const res = await bokeList(parmas);
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
    query: {
      code: 1,
    },
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
        console.log("触发了");
      }
    }, 2000)
  );
}
</script>

<template>
  <div class="home">
    <div class="ourself-left">
      <div class="outLine">
        <div class="left-title">
          <h2 class="title">
            {{ this.$store.state.user_data.userName || "游客" }}
          </h2>
        </div>
        <div class="left-img">
          <img :src="TouXiang" />
        </div>
        <div class="left-saying">
          <div class="saying">say</div>
        </div>
        <div class="left-myself">
          <div class="myself-btn" @click="ourHome">个人主页</div>
        </div>
      </div>
    </div>
    <div class="ourself-right">
      <!-- search内容 -->
      <div class="right-bgi">
        <img :src="searchBgc" />
      </div>
      <h1 class="search-h1">SearchIng</h1>
      <div class="right-search">
        <div class="search">
          <input type="text" v-model="keyWord" />
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

      <!-- list内容 -->
      <div class="right-list">
        <div class="bodys" ref="bodys">
          <div
            class="list-information"
            v-for="(item, index) in arrList"
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
                <div class="information-text-nav">{{ item.nav }}</div>
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
  </div>
</template>

<style scoped lang="sass"></style>
