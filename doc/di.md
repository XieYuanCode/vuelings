依赖注入（Dependency Injection, DI）是一种设计模式，用于将组件或服务的依赖关系从代码中分离出来，使得这些依赖关系在运行时注入，而不是在代码中硬编码。通过这种方式，可以更容易地进行单元测试、解耦和模块化。

在 TypeScript 中实现依赖注入可以通过以下几个步骤来完成。下面是一个简单的例子，展示如何实现依赖注入。

### 1. 定义接口和类

首先，定义一些接口和具体的类，表示要注入的依赖。

```typescript
// 定义接口
interface Logger {
  log(message: string): void;
}

// 具体的依赖实现
class ConsoleLogger implements Logger {
  log(message: string): void {
    console.log(`Log: ${message}`);
  }
}

class FileLogger implements Logger {
  log(message: string): void {
    // 假设这里实现写入到文件的逻辑
    console.log(`Writing to file: ${message}`);
  }
}
```

### 2. 定义需要依赖注入的类

然后定义一个类，这个类依赖于上面的 `Logger` 接口。这个依赖将通过构造函数注入。

```typescript
class MyService {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  doSomething() {
    this.logger.log('Doing something...');
  }
}
```

### 3. 创建一个简单的依赖注入容器

接下来，我们可以创建一个简单的依赖注入容器，用于管理依赖关系的注入。这个容器负责创建对象并注入它们的依赖。

```typescript
class DIContainer {
  private static services = new Map<string, any>();

  // 注册服务
  static register<T>(key: string, service: T) {
    this.services.set(key, service);
  }

  // 获取服务
  static resolve<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service not found for key: ${key}`);
    }
    return service;
  }
}
```

### 4. 注册和解析依赖

在容器中注册依赖项，并通过容器获取服务实例。

```typescript
// 创建依赖实例
const consoleLogger = new ConsoleLogger();
const fileLogger = new FileLogger();

// 将依赖注册到容器中
DIContainer.register('logger', consoleLogger);  // 选择使用 ConsoleLogger
// DIContainer.register('logger', fileLogger); // 可以选择 FileLogger

// 解析并注入依赖
const logger = DIContainer.resolve<Logger>('logger');

// 创建需要依赖的服务
const myService = new MyService(logger);

// 使用服务
myService.doSomething();
```

### 5. 结果输出

运行上述代码，输出如下：

```text
Log: Doing something...
```

### 总结

1. **定义接口**：为你的服务定义一个接口，指定行为。
2. **实现依赖**：创建依赖的具体实现类。
3. **注入依赖**：在需要依赖的类中，通过构造函数注入所需的依赖项。
4. **依赖注入容器**：创建一个简单的容器，负责注册和解析依赖关系。

这个例子展示了如何在 TypeScript 中使用依赖注入模式。尽管实现非常基础，但它展示了依赖注入的核心思想——解耦类与其依赖的关系，从而提高了代码的可维护性和可测试性。在实际项目中，你可能会使用更强大的依赖注入库（如 [InversifyJS](https://inversify.io/) 或 [tsyringe](https://github.com/microsoft/tsyringe)）来简化和扩展这一过程。