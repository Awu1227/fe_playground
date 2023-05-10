---
outline: deep
---

# 浏览器 api

## Storage 封装

### Cookie 和 Storage 的区别

- 存储大小：Cookie 4K, Storage 5M
- 有效期：Cookie 拥有有效期，Storage 永久存储
- Cookie 会发送到服务器端，存储在内存中，Storage 只存储在浏览器端
- 路径：Cookie 没有路径限制，Storge 只存储在域名下
- API：Cookie 没有特定的 API，Storage 有对应的 API

### 为什么封装 Storage

- Storage 本身有 API，但是只是简单的 key/value 形式
- Storage 只存储字符串，需要手动转换成 json 对象
- Storage 只能一次性清空，不能单个清空

### 如何封装 Storage

```js
const STORAGE_KEY = "xxx";

export default {
  getStorage() {
    return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "{}");
  },

  // 获取某一个属性，模块可选
  getItem(key, modeule_name) {
    if (modeule_name) {
      let val = this.getItem(modeule_name);
      if (val) return val[key];
    }
    return this.getStorage()[key];
  },

  // 增加某个属性，模块可选
  setItem(key, value, modeule_name) {
    if (modeule_name) {
      let obj = this.getItem(modeule_name);
      obj[key] = value;
      this.setItem(modeule_name, obj);
    } else {
      let obj = this.getStorage();
      obj[key] = value;
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
    }
  },
  // 删除某个属性，模块可选
  clear(key, modeule_name) {
    let obj = this.getStorage();

    if (modeule_name) {
      delete obj[modeule_name][key];
    } else {
      delete obj[key];
    }
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
  },
};
```

[添加单测](https://github.com/Awu1227/mi-mall/blob/main/src/storage/index.spec.js)
