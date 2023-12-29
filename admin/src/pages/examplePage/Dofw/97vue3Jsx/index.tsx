import { defineComponent, ref } from "vue"
import { ElButton } from "element-plus"

export default defineComponent({
  setup() {
    const val = ref(0)

    const fatherClick = (e) => {
      val.value++
    }

    console.log(123, <div></div>)

    return () => (
      <div>
        <h1 onClick={fatherClick}>点击</h1>
        <div>{val.value}</div>
        <br />
        <ElButton>Element-Btn</ElButton>
        <br />
      </div>
    )
  }
})
