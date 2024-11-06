import { injectable, inject } from "inversify";
import "reflect-metadata";

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
    return function(target: any, propertyKey: any, parameterIndex: any) {
        const existingInjectedParameters = Reflect.getOwnMetadata("inversify:paramtypes", target) || {};
        existingInjectedParameters[parameterIndex] = serviceIdentifier;
        Reflect.defineMetadata("inversify:paramtypes", existingInjectedParameters, target);
        inject(serviceIdentifier)(target, propertyKey, parameterIndex);
    };
}