import {signal, Signal, WritableSignal} from "@angular/core";
import {FetcherFunction, ReactiveStateInit} from "./types";
import {isObservable, Observable} from "rxjs";
import {isPromise} from "rxjs/internal/util/isPromise";

export class ReactiveState<T> {
  get isError(): Signal<boolean> {
    return this.#isError.asReadonly();
  }

  get isSuccess(): Signal<boolean> {
    return this.#isSuccess.asReadonly();
  }

  get isFetching(): Signal<boolean> {
    return this.#isFetching.asReadonly();
  }

  get data(): Signal<T | undefined> {
    return this.#data.asReadonly();
  }

  readonly #mutateFn?: FetcherFunction<T>;

  readonly #data: WritableSignal<T>;
  readonly #isFetching: WritableSignal<boolean>;
  readonly #isSuccess: WritableSignal<boolean>;
  readonly #isError: WritableSignal<boolean>;

  constructor(
    {
      defaultValue,
      isFetching,
      isSuccess,
      isError,
      mutate
    }: ReactiveStateInit<T>,
  ) {
    this.#mutateFn = mutate;
    this.#data = signal(defaultValue);
    this.#isFetching = signal(isFetching || false);
    this.#isSuccess = signal(isSuccess || false);
    this.#isError = signal(isError || false);
  }

  #onSuccess(value: T) {
    this.#data.set(value);
    this.#isFetching.set(false);
    this.#isSuccess.set(true);
    this.#isError.set(false);
  };

  #onError(e: unknown) {
    this.#isFetching.set(false);
    this.#isSuccess.set(false);
    this.#isError.set(true);
    console.error('Error on updating ReactiveState: ', e);
  };

  mutate(v?: T) {
    if (arguments.length == 1) this.#data.set(v!);
    else if (this.#mutateFn) {
      this.#isFetching.set(true);
      this.#isSuccess.set(false);
      this.#isError.set(false);
      if (isObservable(this.#mutateFn(this.#data()))) {
        (this.#mutateFn(this.#data()) as Observable<T>).subscribe({
          next: v => this.#onSuccess(v),
          error: e => this.#onError(e),
        });
      } else if (isPromise(this.#mutateFn(this.#data()))) {
        (this.#mutateFn(this.#data()) as Promise<T>)
          .then(v => this.#onSuccess(v))
          .catch(e => this.#onError(e));
      } else {
        try {
          this.#onSuccess(this.#mutateFn(this.#data()) as T);
        } catch (e) {
          this.#onError(e);
        }
      }
    } else {
      throw new Error('No function to update the value provided!');
    }
  }

  customSet({data, isFetching, isSuccess, isError}: {
    data?: T,
    isFetching?: boolean,
    isSuccess?: boolean,
    isError?: boolean
  }) {
    data && this.#data.set(data);
    isFetching && this.#isFetching.set(isFetching);
    isSuccess && this.#isSuccess.set(isSuccess);
    isError && this.#isError.set(isError);
  }

}

function isCallback<T>(maybeFunc: T | unknown): maybeFunc is T {
  return typeof maybeFunc === 'function';
}
