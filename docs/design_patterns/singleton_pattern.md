# 单例模式

> 单例是可以实例化一次，并且可以全局访问的类。这个单一实例可以在我们的整个应用程序中共享，这使得单例非常适合管理应用程序中的全局状态。

首先，让我们看看使用 ES2015 类的单例是什么样的。看下面这个例子：

```js
let counter = 0;

class Counter {
  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}
```

我们构建一个`Counter`类，它具有：

- 返回示例的 `getInstance`方法
- 返回`counter`变量当前值的`getCount`方法
- 将`counter`值递增 1 的`increment`方法
- 将`counter`值递减 1 的`decrement`方法

然而，这个类不符合单例的标准！Counter 类应该只能被实例化一次。目前，我们可以创建 Counter 类的多个实例。

```js{21,22}
let counter = 0;

class Counter {
  getInstance() {
    return this;
  }

  getCount() {
    return counter;
  }

  increment() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();

console.log(counter1.getInstance() === counter2.getInstance()); // false
```

通过两次调用 `new` 方法，我们只是将 `counter1` 和 `counter2` 设置为不同的实例。 `counter1` 和 `counter2` 上的 `getInstance` 方法返回的值有效地返回了对不同实例的引用：它们并不严格相等！

<video controls="controls">
  <source src="https://res.cloudinary.com/ddxwdqwkr/video/upload/f_auto/v1609056519/patterns.dev/jspat-52_zkwyk1.mp4" type="video/mp4" />
</video>

为了让我们只能创建一个`Counter`类的实例
