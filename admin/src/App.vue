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
@import './assets/scss/base.scss';
@import './assets/scss/theme.scss';

.wrapper {
  width: 100px;
  height: 100px;
  border: 1px solid green;
  background-color: var(--color-background);

}

.child {
  background-color: var(--color-background);
}
</style>
