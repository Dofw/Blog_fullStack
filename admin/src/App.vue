<script setup lang="ts">
const onClick = () => {
  const bodyDom = document.body
  const names = bodyDom.getAttribute('class')
  console.log(names)

  if (names && names.indexOf('dark') > -1) {
    bodyDom.classList.remove('dark')

  } else {

    bodyDom.classList.add('dark')
  }
}

</script>

<template>

  <div class="wrapper" @click="onClick">
    <div class="child">1231232</div>
  </div>
</template>

<style lang="scss" scoped>
.child {
  width: 200px;
  height: 200px;
  background-color: #000;
  @include font_color(vt-c-text-inverse-1)
}
</style>
