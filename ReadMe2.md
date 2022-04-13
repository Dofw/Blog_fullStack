### Nest

技术栈总结：使用的依赖包

> mongDB 数据库

mongoose: 基于 js 写的 mongoDB 的 tool 库。自己提供了 type definitions。

@typegoose/typegoose: 使用 typescirpt 写 mongDB 模型,提供类型支持及装饰器功能; 依赖 mongoose。官方文档：https://typegoose.github.io/typegoose/docs/guides/quick-start-guide#install。

nestjs-typegoose: ts 支持; @nestjs/mongoose: js 版本。

> Crud 通用插

nestjs-mongoose-crud: 全栈之巅作者自己，封装的 Crud 的开源库。牛逼！依赖 nestjs-typegoose or @nestjs/mongoose。

> nest 自身支持 Swagger

@nestjs/swagger swagger-ui-express: express 模式

@nestjs/swagger fastify-swagger: fastify 模式

> 验证方面

class-validator：验证

class-transformer：数据格式转换

??? typescript type ModelType<T> = mongoose.Model<DocumentType<T>, {}> & T

### Model

- 使用 nestjs-typegoose, 解耦。 同时创建的 class Model {}, nestjs-typegoose 内部实现为 Model, 也可以作为 interface 使用实现验证等功能。通过@injectModel 注入的 ts 类型使用 @typegoose/typegoose, ModelType<T>定义, 接口函数的参数 ts 类型 使用 class Model {} 作为类型。实践结果：使用 ModelType<T> 设置参数中 query 类型，swagger 显示不出参数信息。

#### article

```json
{
    title: 标题,
    content: 内容,
    tag: 标签,
    digest: 摘要,
    imgUrl: 封面url,
    createTime: 创建时间,
    updataTime: 更新事件,

	  category: 类型, // 关联构思
    user: 用户,
    comment：评论,
}
```

### Admin Client

1. 技术栈: vue3、typescript、 element-ui、 vite（webpack）

### 其他总结

1. ctrl + . vscode 自动修复 import 补全问题。

2. yarn upgrade-interactive --latest 用来更新 安装的包。

3. 使用 nestjs-typegoose, 解耦。 同时创建的 class Model {}, nestjs-typegoose 内部实现为 Model, 也可以作为 interface 使用实现验证等功能。通过@injectModel 注入的 ts 类型使用 @typegoose/typegoose, ModelType<T>定义, 接口函数的参数 ts 类型 使用 class Model {} 作为类型。实践结果：使用 ModelType<T> 设置类型，swagger 显示不出参数信息。

4. 有关 xxx.d.ts 文件说明：Typescript 中文官网指出 使用其它的 JavaScript 库要想描述非 TypeScript 编写的类库的类型，我们需要声明类库所暴露出的 API。

我们叫它声明因为它不是“外部程序”的具体实现。 它们通常是在 .d.ts 文件里定义的。 如果你熟悉 C/C++，你可以把它们当做 .h 文件。 让我们看一些例子。

5. 关于 typescript

   - 适用于 Vscode + Volar

   Vscode: 自身提供了 VSCode's built-in TS language service

   Volar: 创建了一个单独的 TS 语言服务实例，并添加了 Vue 特定支持的补丁

   缺点： 为了让 Vue sfc 和 TypeScript 协同工作，Volar 创建了一个单独的 TS 语言服务实例，并在 Vue sfc 中使用它。同时，普通的 TS 文件仍然由 VSCode 内置的 TS 语言服务处理，这就是为什么我们需要 TypeScript Vue Plugin 来支持 TS 文件中 Vue SFC 的导入。这个默认设置可以工作，但是对于每个项目，我们都运行两个 TS 语言服务实例:一个来自 Volar，一个来自 VSCode 的内置服务。这有点低效，并且可能导致大型项目中的性能问题。

   解决方案：Volar 提供了一个名为“接管模式”的特性来提高性能。在接管模式下，Volar 使用一个 TS 语言服务实例 同时支持 Vue 和 TS 文件。

   你需要在你的项目工作区中禁用 VSCode 内置的 TS 语言服务，只需按照以下步骤: ctrl + shift + p 输入 built (就是插件市场) 输入 @builtin typescript 点击“TypeScript and JavaScript Language Features”的小齿轮图标，选择“Disable (Workspace)”；Reload the workspace.

   - Vue CLI 基于 webpack and ts-loader

   缺点：在基于 webpack 的设置(如 Vue CLI)中，通常会将类型检查作为模块转换管道的一部分，例如 ts-loader。然而，这并不是一个干净的解决方案，因为类型系统需要整个模块图的知识来执行类型检查。单个模块的转换步骤并不适合该任务。导致以下问题:

   Ts-loader 只能输入检查转换后的代码。这与我们在 ide 或 vue-tsc 中看到的错误不一致，它们直接映射回源代码。

   类型检查可能很慢。当它在代码转换的同一线程/进程中执行时，它会显著影响整个应用程序的构建速度。

   我们已经在 IDE 中单独的进程中运行了类型检查，因此降低开发体验的成本并不是一种好的权衡。

   - 推荐

   如果你现在通过 Vue CLI 使用 Vue 3 + TypeScript，我们强烈建议你迁移到 Vite。

   - 了解

   我们还在开发 CLI 选项来启用 transpile-only TS 支持，这样你就可以切换到 vue-tsc 进行类型检查 （vue-tsc is a wrapper around tsc，it supports Vue SFCs in addition to TypeScript files）。vue-tsc 目前不支持 监听模式，已经在开发的路上了）。 同时，如果您希望将类型检查作为 dev 命令的一部分，请检查 vite-plugin-checker。

### 3-19 陌生知识点

    1. oss云存储
    1. Avue中有很多，后台管理相关的需求设计
    1. vueUse，基于vue2和vue3的工具集

### Vue3 中 eslint 配置

1.依赖插件：

prettier

@vue/eslint-config-prettier

@vue/eslint-config-typescript

eslint-plugin-vue

2.extends 与 plugin 的各自规则 及 区别：查看自己的 总结的笔记相当不错哈哈。

3.通过 vite 生成的配置的最佳实践：

```js
"extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier"
  ],
  "env": {
    "vue/setup-compiler-macros": true // 给vue插件，指定使用的环境
  },
```

### 进度

#### 327

- Typescript

基本使用：vuejs.org 官网。

存在问题：typescript 官网，配置细节问题。

- pinia

官网地址：https://pinia.vuejs.org/

#### 413

- NaiveUi
  作为后台管理页面的搭建。 学习 NaiveUi 的优秀代码(css、js)。

- Quasar
  风格比较好看的 Vue3 组件库。
