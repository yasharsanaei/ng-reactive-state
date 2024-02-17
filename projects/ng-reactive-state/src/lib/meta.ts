import {reactiveStateDev} from "./reactive-state";
import {isDevMode} from "@angular/core";

export function reactiveStateLogger(target: any, key: string) {
  if (!isDevMode()) return;
  let currentValue: any = target[key];
  Object.defineProperty(target, key, {
    set: (value: any) => {
      currentValue = reactiveStateDev(value.data(), {
        isError: value.isError(),
        isSuccess: value.isSuccess(),
        isFetching: value.isFetching(),
      });
    },
    get: () => currentValue
  })
}


