import { createReducer, on } from '@ngrx/store';
import { InsuranceTakerActions } from './insurance-taker.actions';
import { InsuranceTakerModel } from './insurance-taker.model';

type State = InsuranceTakerModel

export interface InsuranceTakerStore {
  insuranceTaker: State;
}

export const initialState: State = new InsuranceTakerModel();

export const insuranceTakerReducer = createReducer(
  initialState,
  on(InsuranceTakerActions.update, (state, { model }): State => state = model)
);
