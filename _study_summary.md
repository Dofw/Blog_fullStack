### Admin Client

1. 技术栈: vue3、typescript、 element-ui、 vite（webpack）

### 其他总结

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

### Typescript

1. 关于 typescript

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

**TS 官网-配置细节问题**

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

Readonly<T>和 Partial<T>用处不小，因此它们与 Pick和 Record一同被包含进了TypeScript的标准库里：

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}
type Record<K extends string, T> = {
    [P in K]: T;
}

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}
type Partial<T> = {
    [P in keyof T]?: T[P];
}

Readonly， Partial和 Pick是同态的，但 Record不是。 因为 Record并不需要输入类型来拷贝属性，所以它不属于同态：

type ThreeStringProps = Record<'prop1' | 'prop2' | 'prop3', string>
非同态类型本质上会创建新的属性，因此它们不会从它处拷贝属性修饰符。

```

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

1. @mixin 中 的 @include 只有在该@mixin 使用时被访问，如果被访问时，@include 相对应的@mixin 沒有定义。就会报错。

### ★ 学习路线、新技能

#### 1. menorepo、博客搭建

    - 登录授权
    - 动画知识总结

#### 2. CLI 搭建

#### 3. webpack、vite、plugin 学习

    - 学习如何在实际开发中增效。

#### 4. cavase、svg、threejs

    - 学习

#### 5. 阅读设计模式、VUE、webkit 技术内幕书（不知道干啥的时候，看看）

#### 6. js、ts、浏览器 api 基础巩固。

#### 7. Go、java、数据库学习

#### 8. 算法
