import { LocationModel } from './location.model';
import { InjectionToken } from '@angular/core';
import { Repository } from '@premcalc/forms';

export const LocationRepository = new InjectionToken<Repository<LocationModel>>(
  'LocationRepository'
);

// export type LocationRepositoryT = {
//   get: () => Observable<LocationModel>;
//   update: (model: LocationModel) => void;
// };
