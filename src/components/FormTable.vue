<template>
  <div>
    <el-form ref="form" :model="forms" label-width="80px">
      <el-form-item
        label="用户名"
        prop="name"
        :rules="[{ required: true, message: '用户不能为空', trigger: 'blur' }]"
      >
        <el-input
          type="text"
          size="medium"
          v-model="forms.name"
          maxlength="10"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="输入密码"
        prop="password"
        :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }]"
      >
        <el-input
          size="medium"
          type="password"
          v-model="forms.password"
          show-password
          maxlength="15"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="rePassword"
        :rules="[{ required: true, message: '密码不能为空', trigger: 'blur' }]"
      >
        <el-input
          size="medium"
          type="password"
          v-model="forms.rePassword"
          maxlength="15"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-row style="width: 100%">
          <el-col :span="3"></el-col>
          <el-col :span="4">
            <el-button type="primary" @click="onSubmit">{{
              this.$attrs.btn[0]
            }}</el-button>
          </el-col>
          <el-col :span="6"></el-col>
          <el-col :span="4">
            <el-button @click="onClose">{{ this.$attrs.btn[1] }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, useAttrs, reactive, onMounted, nextTick } from "vue";
name: "FormTalbe";
let forms = ref<any>({
  name: "",
  password: "",
  rePassword: "",
});
const form = ref();
const attrs = useAttrs();
function onSubmit() {
  form.value.validate((valid) => {
    if (valid) {
      const onSubmit: any = attrs.onSubmit;
      onSubmit(forms);
    } else {
      return false;
    }
  });
}
function onClose() {
  const onClose: any = attrs.onClose;
  onClose();
}

// 清空输入项
function clearForm() {
  forms.value.name = "";
  forms.value.password = "";
  forms.value.rePassword = "";
}

onMounted(() => {
  clearForm();
});
</script>

<style scoped></style>
