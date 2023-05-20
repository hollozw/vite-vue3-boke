<template>
  <editor
    v-model="editorValue"
    api-key="no-api-key"
    :init="{
      language: 'zh-Hans',
      height: 600,
      branding: false,
      menubar: false,
      content_css: false,
      skin: false,
      quickbars_insert_toolbar: false,
      plugins: props.plugins,
      toolbar: props.toolbar,
      images_upload_url: '/api/boke/fileImage',
      // images_upload_base_path: '/public',
    }"
  />
</template>

<script lang="ts" setup>
import Editor from "@tinymce/tinymce-vue";

import tinymce from "tinymce/tinymce.js";
// (TinyMCE 6)
// import 'tinymce/models/dom';

// 外觀
import "tinymce/skins/ui/oxide/skin.css";
import "tinymce/themes/silver";

// Icon
import "tinymce/icons/default";

// 用到的外掛
import "tinymce/plugins/image";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/emoticons/js/emojis.js";
import "tinymce/plugins/table";
import "tinymce/plugins/quickbars";

import "tinymce/langs/zh-Hans";

import { ref, watch, onMounted } from "vue";
onMounted(() => {
  console.log(tinymce);
});
const editorValue = ref("");
const props = defineProps({
  plugins: {
    type: [String, Array],
    default: "quickbars emoticons table",
  },
  toolbar: {
    type: [String, Array],
    default:
      " bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify|bullist numlist |outdent indent blockquote | undo redo | axupimgs | removeformat | table | emoticons",
  },
});
const emit = defineEmits(["update:modelValue"]);
watch(editorValue, (newValue) => {
  emit("update:modelValue", newValue);
});
</script>
