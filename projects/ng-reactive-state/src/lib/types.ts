import {Observable} from 'rxjs';
import {Signal} from "@angular/core";

export type FetcherFunction<T> = (data: T) => Observable<T> | Promise<T> | T;

export type ReactiveStateInit<T> = {
  defaultValue: T;
  isFetching?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  name?: string;
};

export type ReactiveStateOptions = Pick<ReactiveStateInit<unknown>, 'isFetching' | 'isSuccess' | 'isError'>;
export type ReactiveStateOptionsDev = Pick<ReactiveStateInit<unknown>, 'isFetching' | 'isSuccess' | 'isError' | 'name'>;

export type DevToolData = {
  data: Signal<unknown>,
  isFetching: Signal<boolean>,
  isSuccess: Signal<boolean>,
  isError: Signal<boolean>,
  name: string,
}
