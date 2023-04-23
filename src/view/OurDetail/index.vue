<script setup lang="ts">
import TouXiang from "@/assets/imgs/tou_xiang.png";
import "./index.sass";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const List = reactive(["主页", "个人博客", "创作", "返回"]);
const sign = ref(0);
onMounted(() => {
  console.log(route.query.code);
});
function jump(id) {
  sign.value = id;
  const arr = ["./OurInformation", "./bokeData", "./createing", "./home"];
  if (arr) {
    if (arr[id] === "./home") {
      router.push({
        path: arr[0],
      });
    }
    router.push({
      path: arr[id],
      query: { id: 1 },
    });
  }
  console.log(id);
}
</script>

<template>
  <div class="ourDetail">
    <div class="ourDetail-left">
      <div class="left-tou"><img :src="TouXiang" /></div>
      <div class="left-navList">
        <div
          v-for="(item, index) in List"
          @click="
            () => {
              jump(index);
            }
          "
          :class="['navList-nav', sign === index ? 'navList-nav-sign' : '']"
        >
          {{ item }}
        </div>
      </div>
      <div class="left-out">
        <div>退出</div>
      </div>
    </div>
    <div class="ourDetail-right">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
