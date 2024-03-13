import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InsuranceTakerActions } from './insurance-taker.actions';
import { InsuranceTakerModel } from './insurance-taker.model';
import { InsuranceTakerStore } from './insurance-taker.reducer';

@Injectable({ providedIn: 'root' })
export class InsuranceTakerRepository {
  static selectAll = (state: InsuranceTakerStore) => state.insuranceTaker;

  private readonly store = inject(Store)

  get(): Observable<InsuranceTakerModel> {
    return this.store.select(InsuranceTakerRepository.selectAll)
  }

  update(model: InsuranceTakerModel) {
    this.store.dispatch(InsuranceTakerActions.update({ model }))
  }

}
