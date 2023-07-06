<template>
  <div class="input-wrapper">
    <span>{{ label }}</span>

    <div class="view-icon" v-if="showPassword" @click="onTriggerIcon">
      <el-icon v-if="isView"><View /></el-icon>
      <el-icon v-if="!isView"><Hide /></el-icon>
    </div>

    <input
      :type="showPassword ? (isView ? 'password' : 'text') : type"
      @keydown="onKeydown"
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, withDefaults, defineEmits } from "vue"
import { View, Hide } from "@element-plus/icons-vue"

interface Props {
  modelValue?: string | number | undefined
  modelModifiers?: object
  showPassword?: boolean
  type?: string
  label?: string
  handlerModifier?: (val, modifiers) => any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  showPassword: false,
  type: "text",
  label: "Label",
  modelModifiers: () => {
    return {}
  }
})

const isView = ref(true)
const onTriggerIcon = () => {
  isView.value = !isView.value
}

const $emits = defineEmits(["update:modelValue", "input", "change", "blur", "keydown", "focus"])

/**
 * 处理modifier的函数。
 * @param val
 */
const modifierFunc = (val) => {
  const cb = props.handlerModifier
  if (typeof cb === "function") return cb(val, props.modelModifiers)
  return val
}

const onInput = (e) => {
  let { value } = e.target as HTMLInputElement
  const result = modifierFunc(value)
  console.log(result)
  $emits("update:modelValue", result)
  $emits("input", result)
}
const onChange = (e) => {
  let { value } = e.target as HTMLInputElement
  const result = modifierFunc(value)
  $emits("change", result)
}
const onFocus = (e) => {
  $emits("focus", e)
}
const onBlur = (e) => {
  $emits("blur", e)
}
const onKeydown = (e) => {
  $emits("focus", e)
}
const onClear = (e) => {}
</script>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  width: 100%;
  height: 50px;
  padding: 0 5px;
  border-radius: 5px;
  border: 2px solid var(--el-color-primary);

  display: flex;
  align-items: center;

  > span {
    position: absolute;
    left: 20px;
    top: -20px;
    font-size: 20px;
  }

  .view-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);

    z-index: 10;
    cursor: pointer;
    color: var(--el-color-primary);
  }

  input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    outline-style: none;
    border: none;

    // 解决密码自动回填，无法修改背景色。
    height: 0; // 比较关键
    padding: 1.2em 0.5em;
    background-clip: content-box;
    -webkit-text-fill-color: var(--el-text-color-primary); // 改变了字体颜色

    // &:-webkit-autofill {
    //   // // 延迟方案
    //   // transition: background-color 5000s ease-in-out 0s;
    //   // // 覆盖方案
    //   // box-shadow: 0 0 0 1000px rgba(255, 155, 255, 1) inset !important;
    //   // -webkit-box-shadow: 0 0 0 1000px rgba(155, 255, 255, 0) inset !important;
    // }
  }
}

@keyframes rotate {
  0% {
    transform: translate(20px, -50px) rotate(-10deg);
  }

  100% {
    transform: translate(20px, -50px) rotate(130deg);
  }
}
</style>
