import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { InsuranceTakerActions } from './insurance-taker.actions';
import { InsuranceTakerModel } from './insurance-taker.model';
import { InsuranceTakerStore } from './insurance-taker.reducer';
import { Observable } from 'rxjs';


export const selectInsuranceTaker = (state: InsuranceTakerStore) => state.insuranceTaker;

@Injectable({ providedIn: 'root' })
export class InsuranceTakerRepository {
  private readonly store = inject(Store)

  get(): Observable<InsuranceTakerModel> {
    return this.store.select(selectInsuranceTaker)
  }

  update(model: InsuranceTakerModel) {
    this.store.dispatch(InsuranceTakerActions.update({ model }))
  }

}
