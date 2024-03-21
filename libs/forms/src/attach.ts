import { InputSignal, WritableSignal } from '@angular/core';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';
import { Subject, combineLatest, debounceTime, takeUntil } from 'rxjs';
import { FormFieldControl, FormFieldT } from './form-field';

export type AttachToParentFormGroupOption = {
  container: ControlContainer;
  fields: FormFieldControl[];
  update: () => void;
};

export const combineToFieldControl = (
  formField: FormFieldT<unknown>,
  control: FormControl
): FormFieldControl => ({
  ...formField,
  control,
});

export type AttachToParentFormGroup<TModel> = {
  readonly model: InputSignal<TModel>;
  readonly controlContainer: ControlContainer;
  readonly formFields: WritableSignal<Map<string, FormFieldControl>>;
  formChanged: (field?: FormFieldControl) => void;
};

export function syncModelWithFormFields<TModel>({
  model,
  formFields,
}: AttachToParentFormGroup<TModel>): void {
  const newMap = new Map();
  const keys = Object.keys(model() as object);

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index];
    const data = (model() as never)[key] as {
      initialValue: unknown;
      validators: [];
      asyncValidators: [];
    };
    if (data) {
      const control = new FormControl(data.initialValue, { validators: data.validators, asyncValidators: data.asyncValidators })
      const fieldControl = combineToFieldControl(data as never, control)
      newMap.set(key, fieldControl)
    }
  }
  formFields.set(newMap);
}

export function attachToParentFormGroup<TModel>({
  model,
  controlContainer,
  formFields,
  formChanged,
}: AttachToParentFormGroup<TModel>): () => void {
  syncModelWithFormFields({ model, controlContainer, formFields, formChanged });

  const destroyed = new Subject();
  if (controlContainer) {
    const parentFormGroup = controlContainer.control as FormGroup;

    if (parentFormGroup) {
      formFields().forEach((field) => {
        if (field.name && field.control) {
          if (!parentFormGroup.get(field.name)) {
            parentFormGroup.addControl(field.name, field.control);
          }

          if (field.disabled) {
            field.control?.disable();
          } else {
            field.control?.enable();
          }
          field.control.setValue(field.initialValue);

          combineLatest([
            field.control.valueChanges.pipe(takeUntil(destroyed)),
            field.control.statusChanges.pipe(takeUntil(destroyed)),
          ])
            .pipe(takeUntil(destroyed))
            .pipe(debounceTime(42))
            .subscribe(() => formChanged(field));
        }
      });
    }
  }

  formChanged();

  return () => {
    destroyed.next(undefined);
    destroyed.complete();
  };
}
