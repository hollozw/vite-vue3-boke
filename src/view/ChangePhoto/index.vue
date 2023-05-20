<script setup lang="ts">
import "./index.sass";
import { useRouter } from "vue-router";
import { onMounted, ref, reactive } from "vue";
import store from "@/store";
import UrlDefault from "@/assets/defaultImgs";
import { userImg, updateUserImg } from "@/utils/axios";
import { ElMessage } from "element-plus";

interface IImgDefault {
  name: string;
  url: string;
}

const image = ref(null);
const inputFile = ref(null);
const upload = ref(null);

const router = useRouter();

let ImSrc = ref<any>("");
let file = ref<any>(
  new File(["foo"], "foo.txt", {
    type: "text/plain",
  })
);
let ImgDefault = reactive<Array<IImgDefault>>(UrlDefault);
const url = "http://localhost:8888";
onMounted(() => {
  getImg();
});
/**
 * 获取当前img图片
 */
function getImg() {
  ImSrc.value = `${url}/src/assets/defaultImgs/1.png`;
}

/**
 * 图片路径改变
 */
function imgChange(value) {
  ImSrc.value = url + value;
}

/**
 * 加载点击input方法
 */
function inputClick() {
  file.value = document.getElementById("file").files[0];
}

/**
 * 确认选择，上传图片
 */
async function confir() {
  await upload.value.submit();
}
async function uploadSuccess(data) {
  if (data.message === "success") {
    ElMessage.success("修改成功");
    const { userName, id } = store.state.user_data;
    const params = {
      userName,
      id,
      filename: data.result.path,
    };
    const res = await userImg(params);
    ImSrc.value = res.data.result.href;
    await updateUserImg({
      user_href: res.data.result.href,
      id,
      user_name: userName,
    });
  }
}
</script>

<template>
  <div class="changePhoto">
    <div class="changePhoto-nav">
      <div class="changePhoto-nav-img">
        <div class="nav-img-btn">
          <el-button
            type="primary"
            @click="
              () => {
                router.back();
              }
            "
            >返回</el-button
          >
          <el-button
            @click="
              () => {
                confir();
              }
            "
            >确认选择</el-button
          >
        </div>
        <div class="nav-img">
          <div class="img-select"><strong>请选择图片</strong></div>
          <div class="img">
            <img ref="image" :src="ImSrc" />
          </div>
        </div>
      </div>
      <div class="changePhoto-nav-chang">
        <div
          class="img-list"
          v-for="item in ImgDefault"
          @click="
            () => {
              imgChange(item.url);
            }
          "
        >
          <img :src="url + item.url" />
        </div>
        <div class="img-upload">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            action="/api/user/userImg"
            :on-success="uploadSuccess"
            ref="upload"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <em>拖拽或点击上传</em>
            </div>
          </el-upload>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.changePhoto .upload-demo
    width: 100%
    height: 100%
    .el-upload
      height: 100%
      .el-upload-dragger
        height: 100%
</style>
