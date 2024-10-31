import "reflect-metadata"

export enum ClassType {
  ENTRY = "ioc:entry",
  REPORTER = "ioc:reporter",
  STORE = "ioc:store",
}

export function classDecoratorFactory(type: ClassType): () => ClassDecorator {
  return (): ClassDecorator => {
    return (constructor) => {
      Reflect.defineMetadata(type, "", constructor)
    }
  }
}

export const Entry = classDecoratorFactory(ClassType.ENTRY)
export const Reporter = classDecoratorFactory(ClassType.REPORTER)
export const STORE = classDecoratorFactory(ClassType.STORE)
