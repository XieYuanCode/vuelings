import { injectable, inject } from "inversify";

function decoratorFactory() {
  return function () {
    return function (target: any) {
      injectable()(target)
    }
  }
}

export const EntryProvider = decoratorFactory()
export const ReporterProvider = decoratorFactory()
export const TesterProvider = decoratorFactory()

export function Inject(serviceIdentifier: symbol) {
  return function (target: any, propertyKey: string | symbol) {
    inject(serviceIdentifier)(target, propertyKey);
  };
}