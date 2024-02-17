export function reactiveStateLogger(target: any, key: string) {
  let currentValue: any = target[key];

  Object.defineProperty(target, key, {
    set: (value: any) => {
      currentValue = value;
    },
    get: () => currentValue
  })
}


