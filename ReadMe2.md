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

- Typescript

基本使用：vuejs.org 官网。

存在问题：typescript 官网，配置细节问题。

1. 多数第三方库，一般都整好了类型声名文件，下载使用即可。一般都是使用 @types/xxx 来统一管理第三方库的声名文件。
2. 当第三方库不提供声名文件时，可能在使用第三方库的时候使用了类型，但是因为项目中没有，导致找不到而报错。为了解决错误提示：

```js
  // 在声名文件中 xxx.d.ts 添加即可
  declare module 'xxx包名'
```

3. 自定义的全局 类型共享方案，通过 export 的方式代码太繁琐。最优方案，在声明文件 xxx.d.ts 中添加 类型定义等。**最关键原因**，只要 tsconfig.json 中的配置包含了我们自定义的声明文件 _.d.ts，则声明文件中的类型定义都能被项目中的 _.ts 文件获取到。
4. 命名空间：在代码量较大的情况下，为了避免各种变量名冲突, 可以将相同模块的函数、类、接口等都放置在命名空间内。见：[掘金](https://juejin.cn/post/7058868160706904078)

5. import { type } from 'xxx', ts 会提示，在 tsconfig.json 中配置"preserveValueImports": true,"isolatedModules": true; 在 TypeScript 3.8 版本中，我们添加了一个仅仅导入/导出 声明语法来作为解决方式。

**Ts 重要提示:**

- 写 Typescript 配置项的笔记，多看 typescript 官网。

```js
import type { SomeThing } from "./some-module.js"
export type { SomeThing }
```

**Ts 接口定义:**

```js
type keys = keyof any 即：string | number | symbol, key总是其中的一种
type Record<K extends keyof any, T> = {
  //P可以视为 索引签名。P可以随便起名。
  [P in K]: T
}

//infer
//与 extends 和三元运算符组合使用，用于推断某个复杂类型的部分，简单的说，就是用来推导泛型参数。
//inter 只能出现在 extends 关键字的右侧；
//inter P 可以理解成数学上的未知数 x；
//其中 extends 关键字的作用，是用来判断 右边的类型 是否兼容 左边的泛型 T，如果兼容则返回 ? 后面的内容，否则返回 : 后面的内容。
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never

//matcher['addRoute']函数的参数...args, 此时 P 就为args。args有可能为1个、两个；因为router.addRoute函数有两个，参数数量不同。
let parent: Parameters<typeof matcher['addRoute']>[1] | undefined



```

- pinia

官网地址：https://pinia.vuejs.org/

- NaiveUi 作为后台管理页面的搭建。 学习 NaiveUi 的优秀代码(css、js)。

- Quasar 风格比较好看的 Vue3 组件库。

- theme 方案

  1. css 变量
  2. 使用 sass 预编译语言(为了兼容性)
     1. vite 中配置全局 sass 变量、mixin 自动引入（在模块中导入 scss、style 中使用了 scss 内容。）

```js
css: {
  preprocessorOptions: {
    scss: {
      additionalData: `@import '@/assets/scss/theme/sass_theme.scss';`
    }
  }
}
```

- 主题元素(变化颜色，不关注大小)

  - text: theme-fc(vt-c-text-1 ... 4)
  - backgroundColor: theme-bg(vt-c-bg,vt-c-bg-soft,vt-c-bg-mute)
  - borderColor: theme-border(vt-c-brand, vt-c-brand-light, vt-c-brand-highlight)
  - boxShadowColor: theme-bShadow(vt-c-shadow-1...5)
  - :hover: theme-hoverBg($start:vt-c-hover-bg-start, $end: vt-c-hover-bg-end), theme-hoverFc(vt-c-hover-fc)

```js

```

- unplugin-auto-import/vite 和 unplugin-vue-components/vite 插件， 实现 ui 组件的库的自动导入。具体看 github。

- Vue-Style 相关的知识点

  - ::v-deep: 简写:deep, 不推荐该写法::v-deep .bar {} ; vue3 强烈推荐:deep(选择器) 调用的方式, 例如: ::v-deep(.bar) {} --> [v-data-xxxxxxx] .bar {}; 有了限制只影响该条件下面的 bar。场景修改 UI 组件库，不影响全局其他的。如果使用 deep 那麽后面都不加 scope 限制。
  - ::v-slotted(): 简写:slotted(选择器), 解决只有父级可以修改插槽样式的问题。即在子组件中可以通过他修改插槽内容样式。
  - ::v-global(): 简写:global(选择器), 定义为全局样式, 去除 scope 的作用, 如何确定为全局样式, 就应该放到同一的全局样式内管理并注释清除好维护。

- 后台管理、菜单

  - 说明: 西安国资的后台还不错。有更好的吸取。

  1. 数据管理
  2. 微服务管理
  3. tools(pdf、编辑器等。)
  4. 用户管理
  5. 角色权限管理
  6. 权限管理
     1. app 级权限
     2. route 级权限
     3. button 级权限(角色身份)
  7. 登录功能(第三方)

### Sass

1. @mixin中 的 @include 只有在该@mixin使用时被访问，如果被访问时，@include相对应的@mixin沒有定义。就会报错。



### ★学习路线、新技能

#### 1. menorepo、博客搭建

#### 2. CLI搭建

#### 3. webpack、vite、plugin学习

#### 4. cavase、svg、threejs

#### 5. 阅读设计模式、VUE、webkit技术内幕书（不知道干啥的时候，看看）

#### 6. js、ts、浏览器api基础巩固。

#### 7. Go、java、数据库学习

#### 8. 算法
