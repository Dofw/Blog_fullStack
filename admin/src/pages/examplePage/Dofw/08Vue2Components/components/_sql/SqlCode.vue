<template>
  <div class="sqlcode-container" :class="['root']">
    <div class="right">
      <div class="top">
        <div class="quick">
          <div class="tag" @click="tag('foreach')">foreach</div>
          <div class="tag" @click="tag('if')">if</div>
          <div class="tag" @click="tag('where')">where</div>
          <div class="tag" @click="tag('trim')">trim</div>
        </div>
      </div>
      <div class="code">
        <div class="multi-sql" :style="{ width: '100%' }">
          <code-ui :ref="'codeui'" :sql="sqlText" @appendCm="appendCm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import codeUi from "./codeUI.vue"
import { format } from "sql-formatter"
export default {
  components: {
    codeUi
  },
  props: {
    // 从父组件传过来的属性
    sqlText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      cmInstance: null // 父组件通过的 getValue() 拿去sql-text
    }
  },
  methods: {
    // dbapi的
    appendCm(cm) {
      this.cmInstance = cm
    },
    formatSql() {
      var sql = format(this.cmInstance.getValue())
        .replace(/# /g, "#")
        .replace(/{ /g, "{")
        .replace(/ }/g, "}")
        .replace(/< foreach/g, "\n<foreach\n")
        .replace(/< \/ foreach >/g, "\n</foreach>\n")
        .replace(/< if/g, "\n<if")
        .replace(/< \/ if >/g, "\n</if>\n")
        .replace(/<\nwhere\n {2}>/g, "\n<where>\n")
        .replace(/< \/\nwhere\n {2}>/g, "\n</where>\n")
        .replace(/< trim/g, "\n<trim")
        .replace(/< \/ trim >/g, "\n</trim>\n")

      this.cmInstance.setValue(sql)
    },
    tag(item) {
      let val = ""
      if (item === "foreach") {
        val =
          '\n<foreach open="(" close=")" collection="" separator="," item="item" index="index">#{item}</foreach>'
      } else if (item === "if") {
        val = '\n<if test="" ></if>'
      } else if (item === "where") {
        val = "\n<where></where>"
      } else if (item === "trim") {
        val = '\n<trim prefix="" suffix="" suffixesToOverride="" prefixesToOverride=""></trim>'
      }

      this.cmInstance.setValue(this.cmInstance.getValue() + val)
    }
  }
}
</script>
<style scoped lang="scss">
.sqlcode-container {
  ::v-deep .el-input__inner {
    height: 27px;
    line-height: 27px;
  }
  ::v-deep .el-input__suffix-inner {
    display: flex;
    justify-content: center;
    align-content: center;
    .el-select__caret {
      height: 27px;
      line-height: 27px;
    }
  }
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 6px;
  //box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #a0a0a0;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  //box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  //background: #ededed;
}

.root {
  display: flex;

  .right {
    display: block;
    // width: 100%;
    width: calc(100vw - 250px) !important;
    overflow: auto;
    border: 1px solid #999999;
    border-left: 0px;
    background-color: #fff;
    //flex-shrink: 0;
    //flex-grow: 3;
    position: relative;
    z-index: 1000;

    .top {
      height: 26px;
      line-height: 26px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #82848a;
      background-color: #d2d2d2;
      .tool {
        .item {
          display: inline-block;
          font-size: 20px;
          color: #009966;
          margin: 0 20px 0 0;
          line-height: 26px;
          cursor: pointer;

          span {
            color: #000;
            font-size: 16px;
          }

          &:hover {
            background-color: #d77f00;
          }
        }
      }

      .quick {
        display: flex;
        .tag {
          //display: inline-block;
          //height: 30px;
          //border: 1px solid #FF9933;
          background-color: #ff9900;
          color: #fff;
          border-radius: 3px;
          margin: 2px;
          line-height: 22px;
          padding: 0 5px;
          cursor: pointer;

          &:hover {
            font-weight: 700;
            background-color: #d77f00;
          }
        }

        .iconfont {
          font-size: 20px;
          margin: 0 5px;
          padding: 0 5px;

          &:hover {
            background-color: #d77f00;
            color: #fff;
          }
        }
      }
    }

    .code {
      display: flex;

      height: 300px;
      border-left: 1px solid #cccc;

      padding: 0px;
      overflow: auto;
      //background-color: #f13838;
      .multi-sql {
        width: calc(100% - 300px);
        background-color: rgba(199, 48, 48, 0.23);
        position: relative;
      }
    }
  }
}
</style>
