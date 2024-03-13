import { createReducer, on } from '@ngrx/store';
import { InsuranceTakerActions } from './insurance-taker.actions';
import { InsuranceTakerModel, createInsuranceTakerModel } from './insurance-taker.model';

type State = InsuranceTakerModel

export type InsuranceTakerStore = {
  insuranceTaker: State;
}

export const initialState = createInsuranceTakerModel();

export const insuranceTakerReducer = createReducer(
  initialState,
  on(InsuranceTakerActions.update, (state, { model }): State => state = model)
);
