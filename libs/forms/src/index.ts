import { InputSignal, WritableSignal } from "@angular/core"
import { AsyncValidatorFn, ControlContainer, FormControl, FormGroup, ValidatorFn } from "@angular/forms"
import { Subject, takeUntil } from "rxjs"

export type FormFieldOptionsT = {
  name: string
  label: string
  disabled: boolean
  loading: boolean
  active: boolean
  validators: ValidatorFn[],
  asyncValidators: AsyncValidatorFn[]
}

export type FormFieldT<T> = FormFieldOptionsT & {
  value: T | undefined
}

export type ModelFieldFactory = <ValueT>(initialValue?: ValueT, options?: Partial<FormFieldOptionsT>) => { [key: string]: FormFieldT<ValueT> };

export declare interface FormFieldFactory {
  <ValueT>(): FormFieldT<ValueT | undefined>;
  <ValueT>(initialValue: ValueT): FormFieldT<ValueT>;
  <ValueT>(initialValue: ValueT, options?: Partial<FormFieldOptionsT>): FormFieldT<ValueT>;
}

export type FormFieldGroup<TKey extends string> = Partial<Record<TKey, FormFieldT<unknown>>>

export const createFormField: FormFieldFactory = <ValueT>(initialValue?: ValueT, options = {}) => ({
  value: initialValue,
  name: '',
  label: '',
  disabled: false,
  loading: false,
  active: true,
  validators: [],
  asyncValidators: [],
  ...options,
})

export type FormFieldControl = FormFieldT<unknown> & {
  control: FormControl
}

export type AttachToParentFormGroupOption = {
  container: ControlContainer,
  fields: FormFieldControl[],
  update: () => void
}



export const combineToFieldControl = (formField: FormFieldT<unknown>, control: FormControl): FormFieldControl => ({
  ...formField,
  control,
})

export type AttachToParentFormGroup<TModel> = {
  readonly model: InputSignal<TModel>
  readonly controlContainer: ControlContainer
  readonly formFields: WritableSignal<Map<string, FormFieldControl>>,
  formChanged: () => void
}

export function syncModelWithFormFields<TModel>({ model, formFields }: AttachToParentFormGroup<TModel>): void {
  const newMap = new Map()
  const keys = Object.keys(model() as object)
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const data = (model() as never)[key] as { value: unknown, validators: [], asyncValidators: [] }
    if (data) {
      newMap.set(key, combineToFieldControl(data as never, new FormControl(data.value, {
        validators: data.validators,
        asyncValidators: data.asyncValidators,
      })))
    }
  }
  formFields.set(newMap)
}

export function attachToParentFormGroup<TModel>({ controlContainer, formFields, formChanged }: AttachToParentFormGroup<TModel>): () => void {
  const destroyed = new Subject()
  if (controlContainer) {
    const parentFormGroup = controlContainer.control as FormGroup;

    if (parentFormGroup) {
      formFields().forEach(field => {
        if (field.name && field.control) {
          if (!parentFormGroup.get(field.name)) {
            parentFormGroup.addControl(field.name, field.control)
          }

          if (field.disabled) {
            field.control?.disable()
          } else {
            field.control?.enable()
          }
          field.control.setValue(field.value)
        }
      })

      parentFormGroup.valueChanges.pipe(takeUntil(destroyed)).subscribe(() => formChanged())
      parentFormGroup.statusChanges.pipe(takeUntil(destroyed)).subscribe(() => formChanged())
    }
  }

  return () => {
    destroyed.next(undefined)
    destroyed.complete();
  }
}
