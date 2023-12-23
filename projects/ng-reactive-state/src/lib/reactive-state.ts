import {signal, Signal, WritableSignal} from "@angular/core";
import {FetcherFunction, VaultObject} from "./types";
import {isObservable, Observable} from "rxjs";
import {toObservable} from "@angular/core/rxjs-interop";
import {isPromise} from "rxjs/internal/util/isPromise";

class ReactiveState<T> {
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

  readonly #cacheTime: number;
  readonly #update: FetcherFunction<T>;

  #data: WritableSignal<T | undefined> = signal(undefined);
  #isFetching: WritableSignal<boolean> = signal(false);
  #isSuccess: WritableSignal<boolean> = signal(false);
  #isError: WritableSignal<boolean> = signal(false);

  data$: Observable<T | undefined>;
  isFetching$: Observable<boolean>;
  isSuccess$: Observable<boolean>;
  isError$: Observable<boolean>;

  // protected constructor(update: FetcherFunction<T>);
  // protected constructor(update: FetcherFunction<T>, defaultValue?: T);
  protected constructor(
    update: FetcherFunction<T>,
    defaultValue?: T,
    cacheTime?: number
  ) {
    this.#update = update;
    if (defaultValue) this.#data.set(defaultValue);
    this.#cacheTime = cacheTime || ReactiveState.defaultCacheTime;
    this.data$ = toObservable(this.#data);
    this.isFetching$ = toObservable(this.#isFetching);
    this.isSuccess$ = toObservable(this.#isSuccess);
    this.isError$ = toObservable(this.#isError);
  }

  #onSuccess = (value: T, key?: any[]) => {
    if (key) {
      const now = Date.now();
      const expire = now + this.#cacheTime * 1000;
      ReactiveState.expireTimeSet.add(expire);
      ReactiveState.vault.set(JSON.stringify(key), {
        expireTime: expire,
        value: value as never,
      });
    }
    this.#data.set(value);
    this.#isFetching.set(false);
    this.#isSuccess.set(true);
    this.#isError.set(false);
  };

  #onError = (e: unknown) => {
    this.#data.set(undefined);
    this.#isFetching.set(false);
    this.#isSuccess.set(false);
    this.#isError.set(true);
    console.error('Error on updating ReactiveState: ', e);
  };

  update<D>(params?: D, key?: any[]) {
    if (key && ReactiveState.vault.has(JSON.stringify(key))) {
      try {
        const value = ReactiveState.vault.get(JSON.stringify(key)) as T;
        this.#data.set(value);
        this.#isSuccess.set(true);
        this.#isError.set(false);
      } catch (e) {
        this.#data.set(undefined);
        this.#isSuccess.set(false);
        this.#isError.set(true);
        console.log('Error on updating ReactiveState: ', e);
      }
    } else if (isObservable(this.#update(params))) {
      (this.#update(params) as Observable<T>).subscribe({
        next: v => this.#onSuccess(v, key),
        error: this.#onError,
      });
    } else if (isPromise(this.#update(params))) {
      (this.#update(params) as Promise<T>)
        .then(v => this.#onSuccess(v, key))
        .then(this.#onError);
    } else {
      try {
        const value = this.#update(params) as T;
        this.#data.set(value);
        this.#isSuccess.set(true);
        this.#isError.set(false);
      } catch (e) {
        this.#data.set(undefined);
        this.#isSuccess.set(false);
        this.#isError.set(true);
        console.error('Error on updating ReactiveState: ', e);
      }
    }
  }

  static create<T>(
    update: FetcherFunction<T>,
    defaultValue?: T,
    cacheTime?: number
  ): ReactiveState<T> {
    return new ReactiveState<T>(update, defaultValue, cacheTime);
  }

  static defaultCacheTime: number = 3600;
  static vault: Map<string, VaultObject> = new Map<string, VaultObject>();
  static expireTimeSet = new Set<number>();
}

export default ReactiveState;
