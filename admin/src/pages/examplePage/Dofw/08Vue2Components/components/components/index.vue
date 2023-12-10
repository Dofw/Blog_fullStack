<template>
  <div class="app-container">
    <el-row :gutter="30">
      <el-col :span="20">
        <component
          :is="curComp"
          :algorithm-type="algorithmType"
          @changeComponent="_changeComponent"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AddOneAnalysis from "./AddOneAnalysis.vue"
import AddOneWarn from "./AddOneWarn.vue"
import { COMP_NAME_KEY } from "./utils.js"

export default {
  data() {
    return {
      name: "", // 搜索关键字
      dynamicComps: {
        // 父组件手动，配置compName <==> component, 和 uitls同步更新。
        [COMP_NAME_KEY.ADD_ANALYSIS]: AddOneAnalysis,
        [COMP_NAME_KEY.ADD_WARN]: AddOneWarn
      },
      curCompName: COMP_NAME_KEY.LIST,
      algorithmType: "" // 区分左侧列表点击的类型。
    }
  },
  computed: {
    curComp() {
      return this.dynamicComps[this.curCompName]
    }
  },
  methods: {
    _changeComponent(compName) {
      this.curCompName = compName || COMP_NAME_KEY.LIST
    }
  }
}
</script>

<style scoped lang="scss">
.delete {
  color: #f56c6c;
}
.app-container {
  border: 1px solid green;
  height: calc(100vh - 100px);
  .zc-resource {
    display: block;
    width: 80px;
    height: 28px;
    font-size: 20px;
    font-weight: 400;
    color: #131314;
    line-height: 28px;
    margin-left: 14px;
    margin-bottom: 10px;
  }
  width: 100%;
  .el-input-group {
    width: 100%;
    margin-left: 15px;
  }
  .left-model {
    padding: 0 10px 10px 10px;
  }
  .dialog-title {
    display: flex;
    align-items: center;
  }
  .title-text {
    font-size: 18px;
    padding-top: 20px;
  }
  .create-category {
    width: 100%;
    margin-top: 4px;

    border: dashed 1px #dcdfe6;
    margin-left: 15px;
  }
  .create-input {
    width: 100%;
    margin-top: 4px;
    margin-left: 15px;
    border-radius: 5px;
  }
  .right-table {
    width: 100%;
    margin-left: 15px;
    margin-top: 10px;
  }
}
.flow-tree {
  height: 600px;
  overflow: scroll;
}
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-track {
  width: 2px;
  background: rgba(#101f1c, 0.1);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(144, 147, 153, 0.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color 0.3s;
  cursor: pointer;
}
</style>
