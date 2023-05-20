<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
onMounted(() => {
  defaultForm();
});
const ruleForm = reactive({
  user_name: "",
  password: "",
  repassword: "",
});

/**
 * 表单恢复默认
 */
function defaultForm() {
  ruleForm.user_name = "";
  ruleForm.password = "";
  ruleForm.password = "";
}

function submitForm(formName) {}
function resetForm(formName) {}
</script>

<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="请输入账号" prop="user_name">
        <el-input type="text" v-model="ruleForm.user_name"></el-input>
      </el-form-item>
      <el-form-item label="请输入新密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="repassword">
        <el-input type="password" v-model="ruleForm.repassword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="sass"></style>
