import { InputSignal, WritableSignal } from "@angular/core"
import { AbstractControl, ControlContainer, FormControl, FormGroup } from "@angular/forms"
import { Subject, takeUntil } from "rxjs"

export type FormFieldOptionsT = {
  name: string
  label: string
  disabled: boolean
  loading: boolean
  hide: boolean
}

export type FormFieldT<T> = FormFieldOptionsT & {
  value: T | undefined
}

export declare interface FormFieldFunction {
  <ValueT>(): FormFieldT<ValueT | undefined>;
  <ValueT>(initialValue: ValueT): FormFieldT<ValueT>;
  <ValueT>(initialValue: ValueT, options?: Partial<FormFieldOptionsT>): FormFieldT<ValueT>;
}

export const formField: FormFieldFunction = <ValueT>(initialValue?: ValueT, options = {}) => ({
  value: initialValue,
  name: '',
  label: '',
  disabled: false,
  loading: false,
  hide: false,
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
  readonly controls: { [key: string]: FormControl }
  readonly controlContainer: ControlContainer
  readonly formFields: Map<string, FormFieldControl>,
  formChanged: () => void
}

export function syncModelWithFormFields<TModel>({ model, formFields, controls }: AttachToParentFormGroup<TModel>): void {
  const keys = Object.keys(model() as object)
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const data = (model() as never)[key]
    const control = (controls as never)[key]
    if (data && control) {
      formFields.set(key, combineToFieldControl(data, control))
    }
  }
}

export function attachToParentFormGroup<TModel>({ controlContainer, formFields, formChanged }: AttachToParentFormGroup<TModel>): () => void {
  const destroyed = new Subject()
  if (controlContainer) {
    const parentFormGroup = controlContainer.control as FormGroup;

    if (parentFormGroup) {
      formFields.forEach(field => {
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

export type DocFormOutput = { [key: string]: { value: unknown, pristine: boolean, invalid: boolean, disabled: boolean } }

export type DocFormComponent = {
  controls: WritableSignal<DocFormOutput>
  formGroup: FormGroup
  // destroyed: Subject<void>
}

export function debugFormControls({ formGroup, controls }: DocFormComponent) {
  const abstractControls: { [key: string]: AbstractControl<unknown, unknown> } = formGroup.controls
  const output: DocFormOutput = {}
  Object.keys(abstractControls).forEach(key => {
    output[key] = {
      value: abstractControls[key].value,
      pristine: abstractControls[key].pristine,
      invalid: abstractControls[key].invalid,
      disabled: abstractControls[key].disabled,
    }
  })
  controls.set(output)
}
