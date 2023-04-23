<template>
  <div>
    <div>子组件</div>
    <div>{{ data }}</div>
    <div><button @click="ZiFun">点击获取子组件数据</button></div>
  </div>
</template>

<script setup>
import {defineEmits, ref} from 'vue'
const props = defineProps({
  data: {
    msgFu: 'string'
  }
})

const a = ref('子组件中的a数据string')
const emit = defineEmits(['sendParent'])
const ZiFun = function () {
  emit('sendParent', '子组件的数据')
}
defineExpose({a})
</script>