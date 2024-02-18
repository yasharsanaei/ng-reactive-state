import {signal, Signal, WritableSignal} from "@angular/core";
import {Mutations, ReactiveStateInit} from "./types";
import {Observable} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";

export class RsBase<T> {
  get isError(): Signal<boolean> {
    return this.#isError.asReadonly();
  }

  set isError(value: boolean) {
    this.#isError.set(value);
  }

  get isSuccess(): Signal<boolean> {
    return this.#isSuccess.asReadonly();
  }

  set isSuccess(value: boolean) {
    this.#isSuccess.set(value);
  }

  get isFetching(): Signal<boolean> {
    return this.#isFetching.asReadonly();
  }

  set isFetching(value: boolean) {
    this.#isFetching.set(value);
  }

  get data(): Signal<T> {
    return this.#data.asReadonly();
  }

  set data(value: T) {
    this.#data.set(value);
  }

  get mutations(): Mutations<T> | undefined {
    return this.#mutations;
  }

  readonly #data: WritableSignal<T>;
  readonly #isFetching: WritableSignal<boolean>;
  readonly #isSuccess: WritableSignal<boolean>;
  readonly #isError: WritableSignal<boolean>;
  readonly #mutations?: Mutations<T>;

  readonly data$: Observable<T>;
  readonly isFetching$: Observable<boolean>;
  readonly isSuccess$: Observable<boolean>;
  readonly isError$: Observable<boolean>;

  constructor(
    {
      defaultValue,
      isFetching,
      isSuccess,
      isError,
      mutations
    }: ReactiveStateInit<T>
  ) {
    this.#data = signal(defaultValue);
    this.#isFetching = signal(isFetching || false);
    this.#isSuccess = signal(isSuccess || false);
    this.#isError = signal(isError || false);
    this.data$ = toObservable(this.#data)
    this.isFetching$ = toObservable(this.#isFetching)
    this.isSuccess$ = toObservable(this.#isSuccess)
    this.isError$ = toObservable(this.#isError)
  }
}
