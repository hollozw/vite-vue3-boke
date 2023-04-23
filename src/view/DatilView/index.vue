<script setup lang="ts">
import './index.sass'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
onMounted(()=>{
  console.log(route.query.code)
})
</script>

<template>
  <div class="detail">
    <div class="detail-top">
      <div class="top-center">
        <div class="center-left">
          <div class="left-img"><img src="#"/></div>
          <div class="left-gr">个人中心</div>
          <div class="left-zy">主页</div>
        </div>
        <div class="center-right">退出</div>
      </div>
    </div>
    <div class="detail-nav">
      <div class="nav-top"></div>
      <div class="nav-bottom"></div>
    </div>
  </div>
</template>

<style scoped>

</style>