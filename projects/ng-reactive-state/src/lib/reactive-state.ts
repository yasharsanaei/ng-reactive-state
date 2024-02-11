import {isObservable, Observable, take} from 'rxjs';
import {isPromise} from 'rxjs/internal/util/isPromise';
import {RsBase} from './rs-base';
import type {FetcherFunction, ReactiveStateInit} from './types';

class ReactiveState<T> extends RsBase<T> {
  constructor({
                defaultValue,
                isFetching,
                isSuccess,
                isError,
              }: ReactiveStateInit<T>) {
    super({
      defaultValue,
      isFetching,
      isSuccess,
      isError,
    });
  }

  mutate(v?: T | FetcherFunction<T>) {
    if (arguments.length == 1)
      if (isCallback(v)) this.#setDataWithMutateFn(v as FetcherFunction<T>);
      else this.data = v!;
    else throw new Error('No function to update the value provided!');
  }

  manualSetter({
                 data,
                 isFetching,
                 isSuccess,
                 isError,
               }: {
    data?: T;
    isFetching?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
  }) {
    if (data) this.data = data;
    if (isFetching) this.isFetching = isFetching;
    if (isSuccess) this.isSuccess = isSuccess;
    if (isError) this.isError = isError;
  }

  #onSuccess(value: T) {
    this.data = value;
    this.isFetching = false;
    this.isSuccess = true;
    this.isError = false;
  }

  #onError(e: unknown) {
    this.isFetching = false;
    this.isSuccess = false;
    this.isError = true;
    console.error('Error on updating ReactiveState: ', e);
  }

  #setDataWithMutateFn(mutateFn: FetcherFunction<T>) {
    this.isFetching = true;
    this.isSuccess = false;
    this.isError = false;
    if (isObservable(mutateFn(this.data()))) {
      (mutateFn(this.data()) as Observable<T>).pipe(take(1)).subscribe({
        next: v => this.#onSuccess(v),
        error: e => this.#onError(e),
      });
    } else if (isPromise(mutateFn(this.data()))) {
      (mutateFn(this.data()) as Promise<T>)
        .then(v => this.#onSuccess(v))
        .catch(e => this.#onError(e));
    } else {
      try {
        this.#onSuccess(mutateFn(this.data()) as T);
      } catch (e) {
        this.#onError(e);
      }
    }
  }
}

function isCallback<T>(maybeFunc: T | unknown): maybeFunc is T {
  return typeof maybeFunc === 'function';
}

const allowedKeysToBeAnInitialStateValue = ['defaultValue', 'isFetching', 'isSuccess', 'isError'];

export function reactiveState<T>(): ReactiveState<T | undefined>;
export function reactiveState<T>(initialValue: ReactiveStateInit<T> | T): ReactiveState<T>;
export function reactiveState<T>(initialValue?: ReactiveStateInit<T> | T): ReactiveState<T> | ReactiveState<T | undefined> {
  if (!initialValue) {
    return new ReactiveState<T | undefined>({defaultValue: undefined} as ReactiveStateInit<T | undefined>);
  } else {
    const keys = Object.keys(initialValue).filter(k => !allowedKeysToBeAnInitialStateValue.includes(k));
    if (keys.length > 0) {
      return new ReactiveState<T>({defaultValue: initialValue as T} as ReactiveStateInit<T>);
    } else {
      return new ReactiveState<T | undefined>(initialValue as ReactiveStateInit<T>);
    }
  }
}
