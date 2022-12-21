## 该实践借鉴 React redux 中的展示组件，和数据处理组件的思想

### BaseForm 组件 (样式、验证等)

1. 设置 formData 的默认 ref，watchEffect 监听外界提供的 formData，并对此深拷贝；原因 v-model = "props.formData.xxx" 同一个引用，不符合开发规范子组件改动 props；同时对外部组件可能造成一定的影响。故深拷贝解决此问题，只需要接受值，将新的结果返回。

2. 部分 Select 选项后台数据的获取(API、store)。

3. 设置 rules 验证规则；修改样式。

4. defineExpose 暴露 form 实例。

5. 验证完成后 $emit('sumbmit', data), $emit('cancle')

### AddForm 组件 (add 接口逻辑在此)

1. 自身提供初始值 formData，有一种情况表单回填来自 id 对应的后台数据值，此时就需要做处理，监听该数据修改自身 formData; **问题**：调用 form.resetFields, 是恢复的后台数据的 初始 ref 值(第一次渲染的)。要想回填已经获取的数据，那么：

```js
const reset = () => {
  baseForm.value.formInstance.clearValidate()
  // 方式1
  // baseForm.value.formInstance.resetFields()
  // formData.value.pass = passData.value
  // 方式2
  formData.value = {
    ...formData.value,
    pass: passData.value // 获取数据后的值。
  }
}
```

2. 同时将 reset 方法暴露到外部，供 dialog X close 恢复初始状态。

3. 处理 新增接口逻辑

4. 当然也可以设计为类似 EditForm 的模式。统一外界给值。

5. 提供两个 $emit 外界的事件处理，submit、 cancle

### EditForm 组件 (eidt 接口逻辑在此)

1. 同 AddForm 的区别，数据是外界传过来的，同时内部不需要获取 例如 id 对应的数据值作为回填，本身后台数据是重外部传进来的。

2. 故 EditForm 内部应该保持和该数据隔离，定义\_formData 做为私有深克隆 props.formData，watchEffect props.formData。和 BaseForm 处理类似。

3. 同 AddForm 一样，同时将 reset 方法暴露到外部，供 dialog X close 恢复初始状态。

4. 提供两个 $emit 外界的事件处理，submit、 cancle

### 总结

在没有 dialog 的情况下。很不错。

在使用 dialog 的情况下。1. 关闭 dialog 的关闭 x 按钮，会 BaseForm $emit 一次， Edit/Add $emit 一次，外界接受到。比较繁琐，封装好了用起来还好。2. close，要使用 edit/add 实例暴露的 reset。

AddForm:

1. ref 实例
2. formData // 没有设计为外界传值。看情况同 edit 设计。
3. submit
4. cancle

EditForm:

1. ref 实例
2. formData
3. submit
4. cancle
