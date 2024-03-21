import { Validators } from '@angular/forms';
import {
  FormFieldGroup,
  ModelFieldFactory,
  createFormField,
} from '@premcalc/forms';

export type LocationModelKeys = 'postalCode' | 'city';
export type LocationModel = FormFieldGroup<LocationModelKeys>;

export const createPostalCodeField: ModelFieldFactory = (val, opts) => ({
  postalCode: createFormField(val, {
    name: 'postalCode',
    label: 'Postal Code',
    ...opts,
    validators: [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(4),
      ...(opts?.validators || []),
    ],
    asyncValidators: [...(opts?.asyncValidators || [])],
  }),
});

export const createCityField: ModelFieldFactory = (val, opts) => ({
  city: createFormField(val, {
    name: 'city',
    label: 'City',
    disabled: true,
    ...opts,
    validators: [Validators.required, ...(opts?.validators || [])],
    asyncValidators: [...(opts?.asyncValidators || [])],
  }),
});

export const createLocationModel = (model?: LocationModel): LocationModel => {
  return {
    ...model,
    ...createPostalCodeField(),
    ...createCityField(),
  };
};
