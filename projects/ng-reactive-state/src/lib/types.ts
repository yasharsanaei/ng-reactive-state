import { Observable } from 'rxjs';

export type FetcherFunction<T> = (data: T) => Observable<T> | Promise<T> | T;

export type ReactiveStateInit<T> = {
  defaultValue: T;
  isFetching?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
};
