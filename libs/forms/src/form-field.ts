import { ValidatorFn, AsyncValidatorFn, FormControl } from '@angular/forms';

export type FormFieldOptionsT = {
  name: string;
  label: string;
  disabled: boolean;
  loading: boolean;
  active: boolean;
  validators: ValidatorFn[];
  asyncValidators: AsyncValidatorFn[];
};

export type FormFieldT<T> = FormFieldOptionsT & {
  initialValue: T | undefined;
};

export type ModelFieldFactory = <ValueT>(
  initialValue?: ValueT,
  options?: Partial<FormFieldOptionsT>
) => { [key: string]: FormFieldT<ValueT> };

export declare interface FormFieldFactory {
  <ValueT>(): FormFieldT<ValueT | undefined>;
  <ValueT>(initialValue: ValueT): FormFieldT<ValueT>;
  <ValueT>(
    initialValue: ValueT,
    options?: Partial<FormFieldOptionsT>
  ): FormFieldT<ValueT>;
}

export type FormFieldGroup<TKey extends string> = Partial<
  Record<TKey, FormFieldT<unknown>>
>;

export const createFormField: FormFieldFactory = <ValueT>(
  initialValue?: ValueT,
  options = {}
) => ({
  initialValue: initialValue,
  name: '',
  label: '',
  disabled: false,
  loading: false,
  active: true,
  validators: [],
  asyncValidators: [],
  ...options,
});

export type FormFieldControl = FormFieldT<unknown> & {
  control: FormControl;
};
