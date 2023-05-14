# 标准化编程规范解决方案

## 为什么需要编程规范？

> 工欲善其事，必先利其器。

对于一些大型的企业级项目而言，通常情况下，我们需要一个团队进行开发，而由于团队成员对技术的理解参差不齐，就会出现\*_一个项目无法具备统一的编程规范，导致项目的代码像多个不同材质的补丁拼接起来一样。_

例如下面这个例子：

```js
const product={
	name: '商品'，
	price:10,
	num:5
};
	let total =0;
function usetotal() {
	total=product.price*product.num
	console.log(product.name+"总价格为： "+total);
}
usetotal()
```

在这个例子中，有一些运算符前后是`有空格`分割的，有些是`没有空格`分割的；有些字符串使用`单引号`，有些字符串使用`双引号`；有些语句结尾`有分号`，有些语句结尾`没有分号`，等等诸如此类没有规范的问题，虽然这样的项目能正常运行，但是它是一个不及格的项目，可以说他是不可维护，不可拓展的。那么正确合格的代码应该是什么样子呢？我们修正上面的例子如下：

```js
const product = {
	name: '商品'，
	price: 10,
	num: 5
}

let total = 0

function usetotal() {
	total = product.price*product.num
	console.log(product.name + '总价格为： ' + total)
}

usetotal()
```

可以发现，我们的代码清爽很多，统一的单引号，统一的空格分隔等，这只是编程规范的冰山一角。

但是，让所有团队成员都学习一遍编程规范，并严格遵守并不现实。我们需要借助工具自动处理规范内容，这也是这一部分需要介绍的内容。

包括

- 编程规范
- Git 规范

## ESLint

- 2013 年 6 月创建的开源项目
- 提供一个插件化的 JavaScript 代码检测工具

**.eslintrc.js 文件**

```js
module.exports = {
  // 表示当前目录为根目录，ESLint规则将被限制到该目录下
  root: true,
  // env表示启用ESLint检测的环境
  env: {
    // 在node环境下启动ESLint检测
    node: true,
  },
  // ESLint中基础配置需要继承的配置
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier/skip-formatting",
  ],
  // 解析器
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: "latest",
  },
  // 需要修改的启用规则及其各自的错误级别
  /**
   * "off" 或 0 - 关闭规则
   * "warn" 或 1 - 开启规则，使用警告级别的错误；warn不会导致程序退出
   * "error" 或 2 - 开启规则，使用错误级别的错误；error被触发时，程序会退出
   */
};
```

## Prettier

- 代码格式化工具
- 开箱即用 int
- 直接集成到 VSCode
- 保存时，让代码直接符合 ESLint

**.prettierrc.json**

```json
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "semi": false,
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "none"
}
```

### 相关链接

- [ESLint 文档](https://zh-hans.eslint.org/docs/latest/use/configure/configuration-files)
- [Prettier 文档](https://www.prettier.cn/)
- [Vue 项目使用 eslint + prettier 规范代码风格](https://juejin.cn/post/6844903661726875656)
- [代码风格（ESLint + Prettier + VSCode）](https://www.yuque.com/xiaowugunxueqiu/pskwge/rgk8p9)

## Git 提交规范

### Commitizen

- Github: [cz-cli](https://github.com/commitizen/cz-cli)
- 当你使用 commitizen 进行代码提交（git commit）时，commitizen 会提交你在提交时所有必需的提交字段。

接下来来介绍一下*commitizen*的用法

1. 全局安装 Commitizen

```bash
npm install -g commitizen@4.2.4
```

若安装失败，可尝试**cnpm**安装

2. 安装并配置 [cz-customizable](https://github.com/leoforfree/cz-customizable)插件

- 2.1 使用 npm 下载 cz-customizable
  ```bash
  npm i cz-customizable@6.3.0 --save-dev
  ```
- 2.2 添加以下配置到 package.json 中
  ```json
  ...
  "config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
  }
  ```
- 2.3 项目根目录下创建.cz-config.js 自定义提示文件

  ```js
  module.exports = {
    // 可选类型
    types: [
      { value: "feat", name: "feat:     新功能" },
      { value: "fix", name: "fix:      修复" },
      { value: "docs", name: "docs:     文档变更" },
      { value: "style", name: "style: 代码格式" },
      { value: "refactor", name: "refactor:     重构" },
      { value: "perf", name: "perf:     性能优化" },
      { value: "test", name: "test:     增加测试" },
      { value: "chore", name: "chore:    构建过程或辅助工具的变动" },
      { value: "revert", name: "revert:   回退" },
      { value: "wip", name: "wip:      打包" },
    ],
    // 步骤
    messages: {
      type: "请选择提交的类型：",
      customScope: "请输入修改的范围（可选）",
      subject: "请简要描述提交（必填）",
      body: "请输入详细描述（可选）",
      footer: "请输入要关闭的issue（可选）",
      confirmCommit: "确认要使用以上信息提交？（y/n）",
    },
    // 默认长度为72
    subjectLimit: 72,
  };
  ```
