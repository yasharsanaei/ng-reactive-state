import {signal, Signal, WritableSignal} from "@angular/core";
import {ReactiveStateInit} from "./types";

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
    }: ReactiveStateInit<T>
  ) {
    this.#data = signal(defaultValue);
    this.#isFetching = signal(isFetching || false);
    this.#isSuccess = signal(isSuccess || false);
    this.#isError = signal(isError || false);
  }
}
