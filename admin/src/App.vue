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
    <div class="child"></div>
  </div>
</template>

<style>
</style>
