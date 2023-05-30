<script setup lang="ts">
import "./index.sass";
import { onMounted, ref, reactive, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getbokeList, talk, getNavs, getUserImg } from "@/utils/axios";
import { ElMessage } from "element-plus";
import store from "@/store";
let fileData = ref(""); // 获取文本内容
let title = ref(""); // 获取标题内容
let anther = ref(""); // 获取作者
let Textvalue = ref(""); // 输入框内容
let giveLike = ref(0); // 用户获取赞量
const route = useRoute();
const router = useRouter();
const code = ref(route.query.code);
let talker = ref<Array<ITalker>>([]);

interface ITalker {
  user_name: string;
  talks: string;
  url: string;
}

onMounted(() => {
  getBokeList();
  getNav();
});

onBeforeUnmount(() => {
  beforDestryTalker();
});

async function beforDestryTalker() {
  const { id, userName } = store.state.user_data;
  const user_talkArray = talker.value.map((item, index) => {
    return { user_name: item.user_name, talks: item.talks };
  });
  const user_talk = JSON.stringify(user_talkArray);
  const params = {
    file_code: code.value,
    user_talk,
    give_like: giveLike.value,
  };
  const { data } = await talk(params);
}
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
 * 获取详情内容
 */
async function getNav() {
  const params = {
    file_code: route.query.code,
  };
  const { data } = await getNavs(params);
  if (data.message === "success") {
    const talk: Array<ITalker> = JSON.parse(data.result.file_talk);
    giveLike.value = data.result.give_like;
    if (talk.length) {
      talk.forEach(async (item, index) => {
        const url = await getUserImg({ user_name: item.user_name });
        talker.value[index] = {
          user_name: item.user_name,
          talks: item.talks,
          url: url.data.result.user_href,
        };
      });
    }
  }
}
/**
 * 点击发表评论
 */
async function speaking() {
  if (Textvalue.value) {
    const { id, userName } = store.state.user_data;
    const obj = {
      user_name: userName,
      talks: Textvalue.value,
      url: store.state.user_href,
    };
    talker.value.push(obj);
    beforDestryTalker();
    Textvalue.value = "";
  }
}

function addGiveLike() {
  if (anther.value !== store.state.user_data.userName) {
    giveLike.value++;
  } else {
    ElMessage.error("无法为自己点赞");
  }
}
</script>

<template>
  <div class="detail">
    <div class="detail-top">
      <div class="top-center">
        <div class="center-left">
          <div class="left-img"><img :src="store.state.user_href" /></div>
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
            <el-button
              type="primary"
              class="get-title"
              @click.once="addGiveLike"
              >当前赞为：{{ giveLike }}</el-button
            >
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
            <img :src="store.state.user_href" />
          </div>
          <el-input v-model="Textvalue" placeholder="请输入相关评论"></el-input>
          <button class="speaking-btn" @click="speaking">发布评论</button>
        </div>
        <div class="tall-bottom">
          <div class="bottom-font"><strong>全部评论</strong></div>
          <div class="bottom-tall">
            <div class="talker-list" v-for="item in talker">
              <div class="talk-img">
                <img :src="item.url" />
              </div>
              <div class="talk-name">
                {{ item.user_name }}：{{
                  item.user_name === store.state.user_data.userName
                    ? "(本人)"
                    : ""
                }}
              </div>
              <div class="talk-nav">
                <div title="nav">{{ item.talks }}</div>
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
