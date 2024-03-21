import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InsuranceTakerActions } from './insurance-taker.actions';
import { InsuranceTakerModel } from './insurance-taker.model';
import { InsuranceTakerStore } from './insurance-taker.reducer';
import { AbstractRepository } from '@premcalc/forms';

@Injectable({ providedIn: 'root' })
export class InsuranceTakerRepository extends AbstractRepository<InsuranceTakerModel> {
  static selectAll = (state: InsuranceTakerStore) => state.insuranceTaker;

  private readonly store = inject(Store);

  override get(): Observable<InsuranceTakerModel> {
    return this.store.select(InsuranceTakerRepository.selectAll);
  }

  override update(model: InsuranceTakerModel) {
    this.store.dispatch(InsuranceTakerActions.update({ model }));
  }
}
