<template>
  <div>
    <div>父组件</div>
    <div>{{ fu }}</div>
    <Zi ref="zi" :data = 'data' @sendParent="fuFun"></Zi>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, getCurrentInstance, onMounted} from 'vue';
import Zi from './Zi.vue';

const fu = ref<string>('空数据')
const data = reactive({
  msgFu: '父组件数据'
})

const zi = ref(null)
const fuFun = function (v) {
  fu.value = v
}
onMounted(()=>{
  console.log(zi.value.a)
})

const instance = getCurrentInstance()
</script>

<style scoped lang="sass">

</style>
