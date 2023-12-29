import {Observable} from "rxjs";

export type FetcherFunction<T> = (
  data: T
) => Observable<T> | Promise<T> | T;

export type MutateFunction<T> = (value?: T) => (T | undefined)

export type VaultObject = {
  expireTime: number;
  value: never;
};

export type ReactiveStateInit<T> = {
  defaultValue: T;
  isFetching?: boolean,
  isSuccess?: boolean,
  isError?: boolean,
  mutate?: FetcherFunction<T>
};
