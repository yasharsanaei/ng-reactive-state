import { Observable } from 'rxjs';

export type MutateFunction<DataType> = (data: DataType) => Observable<DataType> | Promise<DataType> | DataType;
export type Actions<DataType, MutationNames extends string> = Record<MutationNames, MutateFunction<DataType>>;

export type ReactiveStateInit<DataType, MutationNames extends string> = {
  defaultValue: DataType;
  isSuccess?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  actions?: Actions<DataType, MutationNames>;
};

export type ReactiveStateOptions<DataType, MutationNames extends string> = Omit<
  ReactiveStateInit<DataType, MutationNames>,
  'defaultValue'
>;
