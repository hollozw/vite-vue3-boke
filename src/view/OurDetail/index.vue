<script setup lang="ts">
import FormTable from "@/components/FormTable.vue";
import { ElMessage } from "element-plus";
import "./index.sass";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { userDelet, userUpdate } from "@/utils/axios";
import store from "@/store/index";

const router = useRouter();
const List = reactive(["主页", "个人博客", "创作", "返回"]);
const btn = ref<Array<string>>(["修改", "取消"]);
const sign = ref(0);
let propsModel = reactive({ value: "chang" }); // 模式切换
const props = ref(false); // 弹窗出现
onMounted(() => {});
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
}

/**
 * 修改密码
 */

async function submit(v) {
  const { name, password, rePassword } = v.value;
  if (password !== rePassword) {
    ElMessage.error("确认密码需要和密码相同");
    return;
  }
  const params = {
    user_name: name,
    password,
  };
  const { data } = await userUpdate(params);
  if (data.message === "success") {
    ElMessage.success("修改成功，请记住密码");
    props.value = false;
    return;
  }
  ElMessage.error("修改失败");
  props.value = false;
}

function close() {
  props.value = false;
}

function changePhotos() {
  router.push({
    path: "changePhoto",
  });
}

/**
 * 确认删除密码
 */
async function deleteTrue() {
  const params = {
    user_name: store.state.user_data.userName,
  };
  const { data } = await userDelet(params);
  if (data.message === "success") {
    ElMessage.success("删除成功");
    props.value = false;
    localStorage.removeItem("token");
    router.push({
      path: "land",
    });
    return;
  }
  ElMessage.error("删除失败");
  props.value = false;
}
/**
 * 弹窗出现函数
 */
function outProps(model) {
  props.value = true;
  propsModel.value = model;
}

/**
 * 退出登录
 */
function outUserLand() {
  router.push({
    path: "land",
  });
  localStorage.removeItem("token");
  store.state.user_data = { id: -1, userName: "游客" };
}
</script>

<template>
  <div class="keyprops" v-if="props">
    <div class="key-props">
      <div class="props">
        <FormTable
          v-if="propsModel.value === 'chang'"
          :btn="btn"
          @submit="submit"
          @close="close"
        ></FormTable>
        <div v-if="propsModel.value === 'delete'">
          <div class="props-delete">
            <div class="delete-comfir">
              <strong>是否要删除?</strong>
            </div>
            <div class="delete-btns">
              <el-button type="primary" @click="deleteTrue">确认</el-button>
              <el-button @click="close">取消</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="ourDetail">
    <div class="ourDetail-left">
      <div class="left-tou" @click="changePhotos">
        <img :src="store.state.user_href" />
      </div>
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
        <div
          @click="
            () => {
              outProps('chang');
            }
          "
        >
          修改密码
        </div>
        <div
          @click="
            () => {
              outProps('delete');
            }
          "
        >
          账号删除
        </div>
        <div @click="outUserLand">退出</div>
      </div>
    </div>
    <div class="ourDetail-right">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
