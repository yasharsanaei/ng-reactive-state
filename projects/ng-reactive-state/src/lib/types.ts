import {Observable} from 'rxjs';

export type MutateFunction<T> = (data: T) => Observable<T> | Promise<T> | T;
export type Mutations<T> = { [key: string]: MutateFunction<T> }

export type ReactiveStateInit<T> = {
  defaultValue: T;
  isFetching?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  mutations?: Mutations<T>
};

export type ReactiveStateOptions<T> = Omit<ReactiveStateInit<T>, 'defaultValue'>;
