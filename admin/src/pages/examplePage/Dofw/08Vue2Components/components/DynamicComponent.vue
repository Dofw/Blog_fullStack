<template>
  <div>
    <el-button @click="onTrigger">切换</el-button>
    <el-button @click="onViewResult">查看当前所有的状态</el-button>
    {{ result }}
    <component :is="curConfig.component" :state="curConfig.state" @onOperate="onOperate"></component>
  </div>
</template>

<script>
import StepOne from './StepOne.vue';
import StepTwo from './StepTwo.vue';

// 每个组件内部可能使用到的操作状态。
export const OPERATE_TYPE = {
  CANCEL: 'cancel',
  UPDATE_STATE: 'update_state',
}

export default {
  name: 'DynamicComponent',
  data() {
    return {
      curActive: 1,
      compMaps: [
        {
          compId: 1,
          component: StepOne,
          state: {}, // 子组件内部的数据格式必须一致
        },
        {
          compId: 2,
          component: StepTwo,
          state: '',
        }
      ],
      result: ''
    };
  },
  computed: {
    curConfig() {
      const curComp = this.compMaps.find(comp => comp.compId === this.curActive);
      return curComp ? curComp : null;
    }
  },
  methods: {
    onViewResult() {
      const result = this.compMaps.map(comp => {
        return {
          compId: comp.compId,
          state: comp.state,
        }
      })
      this.result = JSON.stringify(result);
    },
    onTrigger() {
      this.curActive = this.curActive === 1 ? 2 : 1;
      console.log(this.curActive)
    },
    /**
     * 1. 根据操作，是否更新对应comp的状态
     * 2. 根据操作，是否交给父组件做进一步的处理，比如隐藏该组件dialog
     */
    onOperate(content) {
      const {compId, operate, data} = content;
      let updateComp //更新操作变量
      switch (operate) {
        case OPERATE_TYPE.CANCEL:
          console.log('取消')
          break;
        case OPERATE_TYPE.SUBMIT:
          console.log('提交')
          break;
        case OPERATE_TYPE.UPDATE_STATE:
          console.log('更新状态')
          updateComp = this.compMaps.find(comp => comp.compId === compId);
          updateComp.state = data;
          break;
        default:
          break;
      }
    },
  },
}
</script>

<style lang="scss" scoped>

</style>