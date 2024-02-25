import {isObservable, Observable, take} from 'rxjs';
import {isPromise} from 'rxjs/internal/util/isPromise';
import {RsBase} from './rs-base';
import {MutateFunction, ReactiveStateInit, ReactiveStateOptions} from './types';

export class ReactiveState<DataType, MutationNames extends string = never> extends RsBase<DataType, MutationNames> {

  constructor({
                defaultValue,
                isFetching,
                isSuccess,
                isError,
                mutations
              }: ReactiveStateInit<DataType, MutationNames>) {
    super({
      defaultValue,
      isFetching,
      isSuccess,
      isError,
      mutations
    });
  }

  perform(mutationName: MutationNames) {
    this.#mutateByName(mutationName as MutationNames);
  }

  mutate(mutateFunction: MutateFunction<DataType>): void;
  mutate(newValue: DataType): void;
  mutate(arg: MutateFunction<DataType> | DataType): void {
    if (typeof arg === 'function') {
      this.#mutateByCustom(arg as MutateFunction<DataType>);
    } else {
      this.#mutateByValue(arg as DataType);
    }
  }

  backdoor({
             data,
             isFetching,
             isSuccess,
             isError,
           }: {
    data?: DataType;
    isFetching?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
  }) {
    if (data) this.data = data;
    if (isFetching) this.isFetching = isFetching;
    if (isSuccess) this.isSuccess = isSuccess;
    if (isError) this.isError = isError;
  }

  #onSuccess(value: DataType) {
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

  #setDataWithMutateFn(mutateFn: MutateFunction<DataType>) {
    this.isFetching = true;
    this.isSuccess = false;
    this.isError = false;
    if (isObservable(mutateFn(this.data()))) {
      (mutateFn(this.data()) as Observable<DataType>).pipe(take(1)).subscribe({
        next: v => this.#onSuccess(v),
        error: e => this.#onError(e),
      });
    } else if (isPromise(mutateFn(this.data()))) {
      (mutateFn(this.data()) as Promise<DataType>)
        .then(v => this.#onSuccess(v))
        .catch(e => this.#onError(e));
    } else {
      try {
        this.#onSuccess(mutateFn(this.data()) as DataType);
      } catch (e) {
        this.#onError(e);
      }
    }
  }

  #mutateByName(mutationName: MutationNames): void {
    if (!mutationName) return;
    const mutator = this.mutations?.[mutationName];
    if (mutator) this.#setDataWithMutateFn(mutator)
    else throw new Error(`Mutation "${mutationName}" not found.`);

  }

  #mutateByCustom(customMutator: MutateFunction<DataType>): void {
    this.#setDataWithMutateFn(customMutator)
  }

  #mutateByValue(newValue: DataType): void {
    this.data = newValue;
  }

}

export function reactiveState<DataType>(): ReactiveState<DataType | undefined>;
export function reactiveState<DataType>(initialValue: DataType): ReactiveState<DataType>;
export function reactiveState<DataType, MutationNames extends string = never>(initialValue: DataType, options: ReactiveStateOptions<DataType, MutationNames>): ReactiveState<DataType>;
export function reactiveState<DataType, MutationNames extends string = never>(initialValue?: DataType, options?: ReactiveStateOptions<DataType, MutationNames>): ReactiveState<DataType> | ReactiveState<DataType | undefined> {
  if (initialValue === undefined && options === undefined) {
    return new ReactiveState<DataType | undefined>({defaultValue: undefined}) as ReactiveState<DataType | undefined>;
  } else if (initialValue !== undefined && options === undefined) {
    return new ReactiveState<DataType>({defaultValue: initialValue}) as ReactiveState<DataType>
  } else {
    return new ReactiveState<DataType>({defaultValue: initialValue!, ...options}) as ReactiveState<DataType>
  }
}
