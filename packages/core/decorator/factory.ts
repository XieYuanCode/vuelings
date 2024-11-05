import "reflect-metadata"

export enum ClassType {
  ENTRY = "ioc:entry",
  REPORTER = "ioc:reporter",
  STORE = "ioc:store",
  TESTER = "ioc:tester"
}

export function classDecoratorFactory(type: ClassType): () => ClassDecorator {
  return (): ClassDecorator => {
    return (constructor) => {
      Reflect.defineMetadata(type, "", constructor)
    }
  }
}

export const entry = classDecoratorFactory(ClassType.ENTRY)
export const reporter = classDecoratorFactory(ClassType.REPORTER)
export const store = classDecoratorFactory(ClassType.STORE)
export const tester = classDecoratorFactory(ClassType.TESTER)
