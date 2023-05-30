<template>
  <div class="bg">
    <div class="bg-canvas">
      <img src="@/assets/imgs/bgi_loading.jpeg" />
    </div>
    <div class="card">
      <div class="card-right">
        <div class="card-login">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
              <el-input size="medium"></el-input>
            </el-form-item>
            <el-form-item label="输入密码">
              <el-input size="medium" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input size="medium" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-row style="width: 100%">
                <el-col :span="3"></el-col>
                <el-col :span="4">
                  <el-button type="primary">注册</el-button>
                </el-col>
                <el-col :span="6"></el-col>
                <el-col :span="4">
                  <el-button>取消</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </div>
        <div class="card-land" style="height: 100%">
          <FormTable :btn="btn" @submit="submit" @close="close"></FormTable>
          <div class="youke" @click="submitYou">游客登陆</div>
        </div>
      </div>
      <div class="card-left">
        <div class="left-block">
          <!-- <div class="block-tou">
            <img src="@/assets/imgs/tou_xiang.png" alt="" />
          </div> -->
          <div class="block-bgc">
            <img src="@/assets/imgs/loadings-bgc.jpeg" />
          </div>
        </div>
        <div class="left-none">
          <!-- <div class="none-tou">
            <img src="@/assets/imgs/title.jpg" alt="无法加载该图片" />
          </div> -->
          <div class="none-bgc">
            <img src="@/assets/imgs/longing-bgc.jpeg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import "./landing.sass";
import FormTable from "@/components/FormTable.vue";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { landing } from "@/utils/axios/index";
import Canvas_cicly_Round from "@/utils/canvas/canvas_oneMethod";
const router = useRouter();
const store = useStore();
const form = ref<IForm>({
  name: "",
  password: "",
  rePassword: "",
});
const btn = ref<Array<string>>(["登录", "注册"]);

/**
 * 提交密码
 */
async function submit(v) {
  const { name, password, rePassword } = v.value;
  if (password !== rePassword) {
    ElMessage.error("确认密码需要和密码相同");
    return;
  }
  const params = {
    username: name,
    password,
  };
  const { data } = await landing(params);
  const url = data.result.user_href
  if (data.message !== "success") {
    ElMessage.error("输入的信息错误");
    return;
  }
  store.state.user_data = data.result
  store.state.user_href = url
  localStorage.setItem("token", data.token);
  localStorage.setItem('ImgSrc', url)
  ElMessage.success(`欢迎，${data.result.userName}`);
  router.push("./home");
}

// 游客登陆功能
function submitYou() {
  store.commit("idChang");
  router.push("./home");
}

// 动画函数
function close() {
  const div: any = document.querySelector(".card-left");
  const card_loading: any = document.querySelector(".left-block");
  const card_login: any = document.querySelector(".left-none");
  card_loading.style.transform = "scale(95%,95%) translateX(-120%)";
  card_login.style.transform = "translateX(-100%)";
  div.style.transform = "translateX(100%)";
  setTimeout(() => {
    router.push("./login");
  }, 2000);
}

function recover() {
  const div: any = document.querySelector(".card-left");
  const card_loading: any = document.querySelector(".left-block");
  const card_login: any = document.querySelector(".left-none");
  card_loading.style.transform = "translateX(0%)";
  card_login.style.transform = "translateX(0%)";
  div.style.transform = "translateX(0%)";
}

onMounted(() => {
  recover();
});
</script>
