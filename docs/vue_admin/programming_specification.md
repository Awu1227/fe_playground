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

  3. 使用`git cz`命令即可实现规范化提交

  ### Git Hooks

在上一小节，我们使用`git cz`代替`git commit`实现了规范化提交的诉求，但是依然存在着有人会忘记使用的问题。

如果遇到这种情况，我们应该如何进行解决呢？这个时候我们就需要使用 Git Hooks，也就是

- git 在执行某个事件之前或之后进行一些其他额外的操作
- 阻止不合规的提交信息

Git 有很多钩子，其中有两个十分重要，分别是：

1. **pre-commit**: git commit 执行前，它不接受任何参数，并且可以按需指定是否要拒绝本次提交
2. **commit-msg**:用来规范化标准格式，用于在检查消息文件后拒绝提交

### 使用 husky + commitlint 检查提交描述是否符合规范要求

要完成这么个小目标，我们需要使用两个工具：

1. [commitlint](https://github.com/conventional-changelog/commitlint)：用于检查提交信息
2. [husky]()：是 git hooks 工具

> npm 版本需要在 7.x 以上

#### commitlint

1. 安装依赖

```bash
npm install --save-dev @commitlint/config-conventional@12.1.4 @commitlint/cli@12.1.4
```

2. 创建 commitlint.config.js 文件

```bash
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

3. 打开 commitlint.config.js，增加配置项

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  // 定义规则
  rules: {
    // type的类型定义：表示git提交的type必须在以下类型范围之内
    "type-enum": [
      // 当前验证的错误级别
      2,
      // 在什么情况下进行验证
      "always",
      // 泛型内容
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
    // subject大小写不做校验
    "subject-case": [0],
  },
};
```

**注意，要确保 js 文件保存格式为 utf-8，否则有可能会出现错误**

#### husky

1. 安装依赖

```bash
npm i husky@7.0.1 --save-dev
```

2. 启动 hooks，生成.husky 文件夹

```bash
npx husky install
```

3. 在 package.json 中生成 prepare 指令（需要 npm > 7.0 版本）

```bash
npm set-script prepare 'husky install'
```

4. 运行 preapre 指令

```bash
npm run preapre
```

5. 执行成功，提示

```bash
> mi-mall@0.0.0 prepare
> husky install

husky - Git hooks installed
```

6. 添加`commitlint`的 hook 到 husky 中，并在`commit-msg`的 hooks 下执行`npx --no-install commitlint --edit "$1"`指令

```bash
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

至此，不符合规范的 commit 将不再可提交：

```bash
󰐀 ~/Desktop/mi-mall/ [main*] git commit -m '增加husky和commitlint'
⧗   input: 增加husky和commitlint
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

husky - commit-msg hook exited with code 1 (error)
```

那么至此，我们就已经可以处理好了**强制规范化的提交要求**，到现在**不符合规范的提交信息，将不可再被提交**

但是我们还缺少一个**规范化的处理**，那就是**代码格式提交规范处理！**
