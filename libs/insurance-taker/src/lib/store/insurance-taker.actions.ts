import { createAction, props } from '@ngrx/store';
import { InsuranceTakerModel } from './insurance-taker.model';

export const InsuranceTakerActions = {
  update: createAction(
    '[InsuranceTaker] Update',
    props<{ model: InsuranceTakerModel }>()
  ),
};
