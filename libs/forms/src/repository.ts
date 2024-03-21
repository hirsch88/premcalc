import { BehaviorSubject, Observable } from 'rxjs';

export type Repository<TState> = {
  get: () => Observable<TState | undefined>;
  update: (state: TState) => void;
};

export abstract class AbstractRepository<TState> implements Repository<TState> {
  abstract get(): Observable<TState | undefined>;
  abstract update(state: TState): void;
}

export class BehaviorRepository<TState> extends AbstractRepository<TState> {
  subject = new BehaviorSubject<TState | undefined>(undefined);

  override get(): Observable<TState | undefined> {
    return this.subject.asObservable();
  }

  override update(state: TState): void {
    this.subject.next(state);
  }
}
