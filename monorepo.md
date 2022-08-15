三、Monorepo项目实践

（一）实践概述

在述说了这么多Monorepo的理念和相关技术后，我们脚踏实地的从实践出发，基于Pnpm从零开始构建一个基础的Monorepo的前端项目架构，里面所使用的技术都是经验所得，可依据团队实际情况进行取舍。技术选择如下：

pnpm：包依赖管理工具。

changesets：包版本管理工具。

eslint，pretter: 代码规范工具。

commitizen，commitlint：提交规范工具。

husky，lint-staged：git hook相关工具。

vitepress：文档服务工具。

接下来，我们逐步应用上述技术，并添加至项目架构当中。

（二）实践流程

基础架构搭建
初始化目录

首先，初始化一个最基本的项目目录结构，包括package.json，README.md，以及packages下的各个项目模块，其中shared为公共方法模块，其中每个模块的命名都以@my-scope/xx (xx为项目模块名称)。

├── package.json
├── packages/
│   ├── pkg1/
├── |    ├──package.json
├── |    ├──src/
│   ├── pkg2/
├── |    ├──package.json
├── |    ├──src/
│   └── shared/
├── |    ├──package.json
├── |    ├──src/
├── README.md
添加Pnpm包管理

然后，添加pnpm作为项目的包管理工具，这里将全局安装pnpm：

npm install pnpm -g
并在根目录的package.json中添加如下脚本来限制包的安装：

// 此行命令将限制使用 pnpm 来进行 install 操作
"scripts": {
  "preinstall": "npx only-allow pnpm"
}
创建pnpm-workspace.yaml文件，并添加如下配置，将packages下所有子目录纳入工作空间进行管理：

packages:
  # 所有在 packages/ 子目录下的 package
  - 'packages/**'
在根目录package.json中添加shared作为依赖模块，后续安装后即可在其他模块使用：

"dependencies": {
  "@my-scope/shared": "workspace:*"
}
添加Changesets版本管理工具

接下来，添加changesets作为项目的版本管理工具，安装其脚手架工具：

pnpm install @changesets/cli -DW
安装成功后，通过changeset命令操作初始化配置文件：

pnpx changeset init
后续，只需安装以下命令进行开发，版本生成以及版本发布即可：

// 开发人员在完成开发后添加 changeset 文件信息
pnpx changeset add


// 管理人员在发布版本前消费 changeset 进行 changelog 生成
pnpx changeset version


// 确认 changelog 和各项流程后发布包
pnpx changeset publish
规范工具配置
添加ESlint、Prettier代码规范工具

首先，根据各个项目的需求安装对应的依赖包，本模板将使用下面所有的依赖：

pnpm install eslint -DW


// 如果使用 Typescript
pnpm install typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser -DW


// 如果使用 Prettier
pnpm install prettier eslint-plugin-prettier -DW
创建.eslintrc.js，并添加如下配置来使得Eslint正常工作：

module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json']
  },
  plugins: ['@typescript-eslint', 'prettier']
}
如果使用prettier则创建.prettierrc文件，并添加如下配置：

semi: false
singleQuote: true
printWidth: 80
trailingComma: 'none'
arrowParens: 'avoid'
如果使用Typescript则创建tsconfig.json文件，并添加如下配置：

{
  "compilerOptions": {
    "allowJs": true,
    "strict": true,
    "module": "ES6",
    "target": "ES2018",
    "noImplicitAny": false,
    "declaration": true,
    "moduleResolution": "Node",
    "esModuleInterop": true,
    "jsx": "preserve",
    "sourceMap": true,
    "lib": ["ES2018", "DOM"],
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  },
  "include": ["packages", "commitlint.config.js", ".eslintrc.js"],
  "exclude": ["node_modules", "**/dist", "docs"]
}

同时在package.json中添加校验命令，后续即可输入命令进行全量校验和自动修复：

"scripts": {
  "lint": "eslint --ext .js,.ts",
  "lint:fix": "eslint --ext .js,.ts --fix",
}
添加Commitizen，Commitlint提交规范校验工具

接下来，先安装commitizen全局工具并安装cz-conventional-changelog适配器：

// 全局安装
npm install commitizen -g
// 项目中安装
pnpm install cz-conventional-changelog -DW
在package.json中添加相关配置使得commitzen可以读取相对应的适配器：

"config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
后续开发完成提交可以使用cz命令进行，并按照提示进行填写即可：

git cz
完成了commit规范脚手架工具配置后，我们再安装commitlint相关依赖进行提交校验：

pnpm install @commitlint/cli @commitlint/config-conventional -DW
创建commitlint.config.js文件，并添加如下代码：

module.exports = {extends: ['@commitlint/config-conventional']}
添加husky、lint-staged

接下来，再来安装git hook相关的工具来确保在提交时触发相应的校验工作：

pnpm install husky lint-staged -DW
这里使用的husky版本>6，因此需要进行初始化相关配置：

pnpm set-script prepare "husky install"
pnpm run prepare
生成.husky/pre-commit hook并添加lint-staged执行命令：

npx husky add .husky/pre-commit 'npx lint-staged'
在package.json中添加相应lint-staged规则来触发eslint进行增量代码校验：

"lint-staged": {
  "*.{js,ts}": [
    "eslint --fix",
    "git add"
  ]
}
生成.husky/commit-msg hook并添加commilint执行命令：

npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
文档服务配置
添加Vitepress文档服务

安装vitepress来生成文档服务：

pnpm install vitepress -DW
在package.json中添加如下脚本

"scripts": {
  "docs:dev": "vitepress dev docs", // 启动本地文档服务
  "docs:build": "vitepress build docs" // 构建打包文档
}
配置vitepress目录结构如下，可前往官网查看相关配置字段：

.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  └─ index.md
具体配置参考官网：Vitepress配置

（https://vitepress.vuejs.org/config/basics.html）

（三）实践小结
至此，我们完成了一个简单的Monorepo项目的搭建，真正的项目还需要添加相应的开发及打包工具比如Vite，Webpack，Rollup等，和代码测试工具，比如Jest。如果项目复杂，也可以选择Turborepo作为构建流工具，可以根据实际情况进行选择。

四、总结

本文对Monorepo进行了不同形式的探索对比以及实践讨论，可以发现Monorepo在前端项目的很多场景中确实是一个非常好的策略选择，也值得我们在更多的实际的项目中去尝试以及使用它。当然，每种策略都不是一个完美的代码管理方式，它们都有着自己的优势和适合的使用场景。技术和策略上的选择从来都不是非此即彼，而是依据团队以及业务的发展去组合和拓展，在已有的基础上提出想法，并在实践中不断的完善各阶段的流程和技术选型，从失败中总结经验，并将经验转化为下一次的进步。

最后，希望本文能够帮助你选择合适的代码管理策略。

参考资料：

1.Guide to Monorepos for Front-end Code

2.为什么前端工程越来越爱使用Monorepo架构

3.Monorepos in Git

4.What is a Monorepo

5.What is monorepo? (and should you use it?)

6.Monorepo vs Multi-Repo: Pros and Cons of Code Repository Strategies

7.Monorepo Wikipedia

8.Pnpm官网
————————————————
版权声明：本文为CSDN博主「腾讯云开发者」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/QcloudCommunity/article/details/122994881
