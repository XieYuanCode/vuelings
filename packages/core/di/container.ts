import { Container } from "inversify"

export const diContainer = new Container()

export const register = <T>(serviceIdentifier: symbol, constructor: new () => T) => {
  diContainer.bind<T>(serviceIdentifier).to(constructor);
};

export const resolve = <T>(serviceIdentifier: symbol): T => {
  return diContainer.get<T>(serviceIdentifier);
};