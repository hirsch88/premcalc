import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

type City = string;

export type LocationApiServiceT = {
  findCities: (postalCode: string) => Observable<City[]>;
};

export const LocationApiService = new InjectionToken<LocationApiServiceT>(
  'LocationApiService'
);
