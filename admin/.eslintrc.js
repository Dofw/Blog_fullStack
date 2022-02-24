module.exports = {
  parser: "@typescript-eslint/parser", // 定义 ESLint 的解析器
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"], // 定义文件继承的子规范
  plugins: ["@typescript-eslint/eslint-plugin"], // 定义所依赖的插件
  root: true,
  env: {
    // 指定代码的运行环境
    browser: true,
    node: true
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",

    "vetur.validation.template": false,
    "vue/no-multiple-template-root": "off"
  }
}
