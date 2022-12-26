## 指令应用

### 为什么 当同一个组件中多次使用了同一个 v-myloading="diffValue", 改变其中一个值 updated 钩子函数执行两次。

```js
  // vue/core 源码提取
  const patchElement = (
    n1: VNode,
    n2: VNode,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {
    const el = (n2.el = n1.el!)
    let { patchFlag, dynamicChildren, dirs } = n2

    patchFlag |= n1.patchFlag & PatchFlags.FULL_PROPS
    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ
    let vnodeHook: VNodeHook | undefined | null // 另外的功能

    ... ...

    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1)
        dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated')
      }, parentSuspense)
    }
  }

  // 即只要触发组件 render 那么diff更新的过程中，每个 绑定v-myloading的 VNode 都会被patchElement到，只要dirs存在就会执行invokeDirectiveHook。

```

处理方法:

```js
// 第一个改变，调用该函数，传入自己的的参数。即oldValue !== value
// patchElement到第二个 v-myloading 时，传入自己的值。由于oldValue === value。故不做操作。element-plus中也是这样做的。
if (binding.oldValue !== binding.value) {
  ... ...
}
```

### 技巧

1. 使用 vue 的 createApp()

```js
const _root: HTMLElement = document.createElement("div")
const app = createApp(Loading) // app应用，使用unmount
const vm = app.mount(_root) // 获取vm.$el loading domTree
_root.remove() //保持纯净环境
```

2. mounted 中 生成一个 loading-instance, 将 app、vm 绑定到该指令下的全局上下文中 el 上, 供整个声明周期使用。 使用 Symbol, 解决不覆盖 el 已有属性。

```js
el[LOADING_INSTANCE] = {
  vm: instance.vm,
  app: instance.app
}
```

3. VUE 官网 directive 使用中，提到：除了 el 外，其他参数都是只读的，不要更改它们。若你需要在不同的钩子间共享信息，推荐通过元素的 dataset attribute 实现。
