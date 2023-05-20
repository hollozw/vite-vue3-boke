<script setup lang="ts">
import "./index.sass";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getbokeList } from "@/utils/axios";
import store from "@/store";
let fileData = ref(""); // 获取文本内容
let title = ref(""); // 获取标题内容
let anther = ref(""); // 获取作者
let Textvalue = ref(""); // 输入框内容
let ourSelf = ref(true); // 是否为作者本人
const route = useRoute();
const router = useRouter();
onMounted(() => {
  getBokeList();
  connectionSpeak();
});

/**
 * 获取该标题的内容信息
 */
async function getBokeList() {
  const user_name = store.state.user_data.userName;
  const params = {
    id: route.query.code,
  };
  const { data } = await getbokeList(params);
  if (data.message[0] === "success") {
    fileData.value = data.data[0].file_data;
    title.value = data.data[0].title;
    anther.value = data.data[0].user_name;
  }
}

/**
 * 发送评论
 */

async function connectionSpeak() {}
async function speaking() {
  console.log(Textvalue.value);
}
</script>

<template>
  <div class="detail">
    <div class="detail-top">
      <div class="top-center">
        <div class="center-left">
          <div class="left-img"><img src="#" /></div>
          <div
            class="left-gr"
            @click="
              () => {
                router.push('OurInformation');
              }
            "
          >
            个人中心
          </div>
          <div
            class="left-zy"
            @click="
              () => {
                router.push('home');
              }
            "
          >
            主页
          </div>
        </div>
        <div
          class="center-right"
          @click="
            () => {
              router.back();
            }
          "
        >
          返回
        </div>
      </div>
    </div>
    <div class="detail-nav">
      <div class="nav-top">
        <div class="nav-base">
          <div class="nav-title">
            <strong>{{ title }}</strong>
          </div>
          <div class="nav-name">作者：{{ anther }}</div>
        </div>
        <div v-html="fileData"></div>
      </div>
    </div>
    <div class="nav-bottom">
      <div class="speaking">
        <div class="tall-input">
          <div class="tall-speak-img">
            <img src="#" />
          </div>
          <el-input v-model="Textvalue" placeholder="请输入相关评论"></el-input>
          <button class="speaking-btn" @click="speaking">发布评论</button>
        </div>
        <div class="tall-bottom">
          <div class="bottom-font"><strong>全部评论</strong></div>
          <div class="bottom-tall">
            <div class="talker-list">
              <div class="talk-img">
                <img src="#" />
              </div>
              <div class="talk-name">admin：{{ ourSelf ? "(本人)" : "" }}</div>
              <div class="talk-nav">
                <div title="nav">nav</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="bottom"></div>
  </div>
</template>

<style scoped></style>
