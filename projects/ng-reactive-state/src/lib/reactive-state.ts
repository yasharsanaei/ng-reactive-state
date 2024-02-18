import {isObservable, Observable, take} from 'rxjs';
import {isPromise} from 'rxjs/internal/util/isPromise';
import {RsBase} from './rs-base';
import {MutateFunction, Mutations, ReactiveStateInit, ReactiveStateOptions} from './types';

class ReactiveState<T> extends RsBase<T> {
  constructor({
                defaultValue,
                isFetching,
                isSuccess,
                isError,
                mutations
              }: ReactiveStateInit<T>) {
    super({
      defaultValue,
      isFetching,
      isSuccess,
      isError,
      mutations
    });
  }

  mutate(mutationName: keyof Mutations<T>): void;
  mutate(customMutator: MutateFunction<T>): void;
  mutate(newValue: T): void;
  mutate(arg: keyof Mutations<T> | MutateFunction<T> | T): void {
    if (typeof arg === 'string') {
      if (typeof this.data() === 'string') {
        this.#mutateByValue(arg as T);
      } else {
        this.#mutateByName(arg as keyof Mutations<T>);
      }
    } else if (typeof arg === 'function') {
      this.#mutateByCustom(arg as MutateFunction<T>);
    } else {
      this.#mutateByValue(arg as T);
    }
  }

  backdoorMutation({
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

  #setDataWithMutateFn(mutateFn: MutateFunction<T>) {
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

  #mutateByName(mutationName: keyof Mutations<T>): void {
    if (!this.mutations) {
      throw new Error('Mutations are not defined.');
    }
    const mutator = this.mutations[mutationName];
    if (mutator) {
      this.#setDataWithMutateFn(mutator)
    } else {
      throw new Error(`Mutation "${mutationName}" not found.`);
    }
  }

  #mutateByCustom(customMutator: MutateFunction<T>): void {
    this.#setDataWithMutateFn(customMutator)
  }

  #mutateByValue(newValue: T): void {
    this.data = newValue;
  }

}

function isCallback<T>(maybeFunc: T | unknown): maybeFunc is T {
  return typeof maybeFunc === 'function';
}

export function reactiveState<T>(): ReactiveState<T | undefined>;
export function reactiveState<T>(initialValue: T): ReactiveState<T>;
export function reactiveState<T>(initialValue: T, options: ReactiveStateOptions<T>): ReactiveState<T>;
export function reactiveState<T>(initialValue?: T, options?: ReactiveStateOptions<T>): ReactiveState<T> | ReactiveState<T | undefined> {
  if (initialValue === undefined && options === undefined) {
    return new ReactiveState<T | undefined>({defaultValue: undefined}) as ReactiveState<T | undefined>;
  } else if (initialValue !== undefined && options === undefined) {
    return new ReactiveState<T>({defaultValue: initialValue}) as ReactiveState<T>
  } else {
    return new ReactiveState<T>({defaultValue: initialValue!, ...options}) as ReactiveState<T>
  }
}
