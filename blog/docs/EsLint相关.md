# EsLint 配置
## 无用变量 -  [eslint no-unused-vars]
```js
  eslint no-unused-vars: [“error”, { “argsIgnorePattern”: “^_” }]
  // 这样配置的话 以 _ 开头的词变量将会跳过 EsLint 的检查
```