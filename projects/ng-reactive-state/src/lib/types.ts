import { Observable } from 'rxjs';

export type MutateFunction<DataType> = (data: DataType) => Observable<DataType> | Promise<DataType> | DataType;
export type Mutations<DataType, MutationNames extends string> = Record<MutationNames, Mutator<DataType>>;
export type Mutator<DataType> = (...args: never[]) => MutateFunction<DataType>;

export type ReactiveStateInit<DataType, MutationNames extends string> = {
  defaultValue: DataType;
  isSuccess?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  mutations?: Mutations<DataType, MutationNames>;
};

export type ReactiveStateOptions<DataType, MutationNames extends string> = Omit<
  ReactiveStateInit<DataType, MutationNames>,
  'defaultValue'
>;
