import {Observable} from "rxjs";

export type FetcherFunction<T, D = any> = (
  params?: D
) => Observable<T> | Promise<T> | T;

export type VaultObject = {
  expireTime: number;
  value: never;
};

export type ReactiveStateInit<T> = {
  update: FetcherFunction<T>;
  defaultValue?: T;
  cacheTime?: number;
};
