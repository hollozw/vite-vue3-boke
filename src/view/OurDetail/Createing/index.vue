<script setup lang="ts">
import "./indexVue.sass";
import { onMounted, ref, watch } from "vue";
import Texterea from "@/components/Texterea";
import store from "@/store";
import { addBoke } from "@/utils/axios/index";
import { ElMessage } from "element-plus";
import { options } from "@/utils/bokeType";
const Drgreader = ref(null);
const title = ref(""); // 标题内容
const textValue = ref(""); // 富文本内容
let typeValue = ref(""); // 类别选择参数
let plugins = ref("quickbars emoticons table image"); // 富文本编译器参数
let toolbar = ref(
  "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | axupimgs | removeformat | table | emoticons | image"
); // 富文本编译器参数

/**
 * 获取整个文章内容
 */
async function getTextInformation() {
  const { id, userName } = store.state.user_data;
  const params = {
    id,
    userName,
    Title: title.value,
    TypeValue: typeValue.value,
    textValue: textValue.value,
  };
  if (typeValue.value || textValue.value || title.value) {
    const res = await addBoke(params);
    if (res.data.message === "success") {
      ElMessage.success("创作成功");
      defaultValue();
    }
  } else {
    ElMessage.error("信息为空");
  }
}

/**
 * 恢复默认值
 */
function defaultValue() {
  title.value = "";
  typeValue.value = "";
  textValue.value = "";
}

/**
 * 渲染前绑定该Drgreader元素的拖拽效果
 */
function eventDrgreader(event) {
  event.preventDefault();
  console.log(event);
}
function dragOverHandler(ev) {
  ev.preventDefault();
}
</script>
<template>
  <div class="create">
    <div class="write">
      <div class="write-top">
        <div class="top-title">
          <input type="text" v-model="title" placeholder="请输入标题..." />
        </div>
        <div class="top-typeSelect">
          <el-select v-model="typeValue" placeholder="请选择类型">
            <el-option
              style="height: 100%"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="top-upload">
          <button class="upload-btn" @click="getTextInformation">发布</button>
        </div>
      </div>
      <div class="write-bottom">
        <div class="bottom">
          <div
            class="bottom-Drgreader"
            @drop="eventDrgreader"
            @dragover="dragOverHandler"
            ref="Drgreader"
          >
            <Texterea
              v-model="textValue"
              :plugins="plugins"
              :toolbar="toolbar"
            ></Texterea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.create
  .el-select
    width: 100%
    height: 50%
    .select-trigger
      height: 100%
      .el-input
        height: 100%
</style>
