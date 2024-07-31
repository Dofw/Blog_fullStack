<template>
  <el-select ref="select" v-model="innerValue" v-bind="$attrs" v-on="$listeners" @focus="onFocus">
    <el-option
      v-for="item in selectedOption"
      :key="item[props.value]"
      style="display: none"
      :label="item[props.label]"
      :value="item[props.value]"
    />
    <el-tree
      ref="selectTree"
      :data="data"
      :node-key="props.value"
      :props="props"
      highlight-current
      :default-expanded-keys="expandKeys"
      @node-click="handleClick"
    >
      <template #default="{ node }">
        <!-- tree节点node -->
        <slot>
          <span>{{ node.data[props.label] }}</span>
        </slot>
      </template>
    </el-tree>
  </el-select>
</template>

<script>
/**
 * 1. $listeners 中的input，change选择后，没有其效果；是因为点击的el-tree；并没有触发el-select；
 * 故，根据el-tree的事件去 $emit el-select 的事件;
 * 2. 关于el-tree的事件，这里设计通过 props传入。
 */
export default {
  props: {
    value: {
      type: [String, Number, Array, null],
      default: null
    },
    data: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => {
        return {
          value: "id",
          label: "label",
          children: "children"
        }
      }
    },
    // tree
    treeNodeClick: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      expandKeys: [], // 与value值也有关系
      treeNode: null
    }
  },
  computed: {
    innerValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val)
        this.$emit("change", val)
      }
    },
    // 必须保证有一个值, 与value值有关系
    selectedOption() {
      const curNode = this.treeNode
      const val = this.value

      if (curNode) return [curNode]

      // 不存在，则根据value获取. 如果 value 给了默认id。就需要找到默认的node。
      const findNode = this.findNode(val, this.data)
      const options = findNode ? [findNode] : [{ label: "", id: undefined }]
      return options
    }
  },
  watch: {
    value: {
      handler(val) {
        if (!val) return
        this.expandKeys = [val] // 编辑回显
      },
      immediate: true
    }
  },
  methods: {
    findNode(val, treeData) {
      let node = null
      for (let i = 0; i < treeData.length; i++) {
        const item = treeData[i]
        if (item[this.props.value] === val) {
          node = item
          break
        } else if (item[this.props.children]) {
          node = this.findNode(val, item[this.props.children])
          if (node) break
        }
      }
      return node
    },
    onFocus() {
      const value = this.innerValue
      this.$refs.selectTree.setCurrentKey(this.innerValue)

      // clear, value 为空时, 手动关闭之前的node.expanded
      if (!value && value !== 0) {
        const prevNodeValue = this.expandKeys[0]
        this.expandNode(prevNodeValue, false)
      }
    },
    expandNode(prevNodeValue, expand) {
      let node = this.$refs.selectTree.getNode(prevNodeValue) // 获取根节点

      while (node && node.level > 1) {
        node = node.parent
      }

      // 找 level 为 1 ，root
      const levelOneNode = node

      if (levelOneNode) {
        levelOneNode.expanded = expand // 设置展开属性
        this.$forceUpdate() // 强制更新以反映状态变化
      }
    },
    handleClick(val, Node) {
      this.treeNode = val

      if (typeof this.treeNodeClick === "function") {
        this.treeNodeClick(val, Node)
      }

      const value = val[this.props.value]
      this.innerValue = value
      this.$refs.select.blur()
    },
    reset() {
      this.expandKeys = []
      this.treeNode = null
    }
  }
}
</script>

<style lang="scss" scoped></style>
