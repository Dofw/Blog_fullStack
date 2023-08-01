<template>
  <PreviewCodes :codeOptions="[]" description="简介: upload 相关知识汇总">
    <template #demo>
      <Example />
    </template>
    <template #summary>
      <input type="file" @change="onChange">
      <v-md-editor :model-value="mdCode" mode="preview" />
    </template>
  </PreviewCodes>
</template>
<script lang="ts">
export default {
  name: "El-upload"
}
</script>
<script setup lang="ts">
import PreviewCodes from "@/components/PreviewCodes/index.vue"
import Example from "./components/index.vue"
import mammoth from 'mammoth';
import { ref } from "vue"

const onChange = (e) => {
  console.log(e.target.files)
  const file = e.target.files[0]

  convertToHtml(file)
}

function convertToHtml(file) {
  const reader = new FileReader();
      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
          .then((result) => {
            const html = result.value;
            console.log(123, html)
            // Process the generated HTML as needed
          })
          .done();
      };
      reader.readAsArrayBuffer(file);
    }
  

const mdCode = ref(`
## El-upload
`)
</script>

<style scoped lang="scss"></style>
