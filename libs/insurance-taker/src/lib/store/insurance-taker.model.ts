import { Validators } from '@angular/forms';
import {
  FormFieldGroup,
  ModelFieldFactory,
  createFormField,
} from '@premcalc/forms';

export type InsuranceTakerModelKeys = 'firstName' | 'lastName';
export type InsuranceTakerModel = FormFieldGroup<InsuranceTakerModelKeys>;

export const createFirstNameField: ModelFieldFactory = (val, opts) => ({
  firstName: createFormField(val, {
    name: 'firstName',
    label: 'First name',
    ...opts,
    validators: [Validators.required, ...(opts?.validators || [])],
    asyncValidators: [...(opts?.asyncValidators || [])],
  }),
});

export const createLastNameField: ModelFieldFactory = (val, opts) => ({
  lastName: createFormField(val, {
    name: 'lastName',
    label: 'Last name',
    ...opts,
    validators: [Validators.required, ...(opts?.validators || [])],
    asyncValidators: [...(opts?.asyncValidators || [])],
  }),
});

export const createInsuranceTakerModel = (
  model?: InsuranceTakerModel
): InsuranceTakerModel => {
  return {
    ...model,
    ...createLastNameField(),
  };
};
