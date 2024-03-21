import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LocationModel,
  LocationModelKeys,
  createLocationModel,
} from './location.model';
import { LocationRepository } from './location.repository';
import {
  AttachToParentFormGroup,
  FormFieldControl,
  attachToParentFormGroup,
} from '@premcalc/forms';
import {
  ControlContainer,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { produce } from 'immer';
import {
  BalFormBundle,
  BalFormGridBundle,
  BalNotification,
} from '@baloise/ds-angular';
import { LocationApiService } from './location.api';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'lib-location',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BalNotification,
    BalFormBundle,
    ReactiveFormsModule,
    BalFormGridBundle,
  ],
  template: `
    @if (model()) {
      @if(postalCode(); as postalCode) {
        @if(postalCode.active) {
        <bal-field [disabled]="postalCode.disabled">
          <bal-field-label>{{ postalCode.label }}</bal-field-label>
          <bal-field-control>
            <bal-form-grid>
              <bal-form-col>
                <bal-input [formControl]="postalCode.control"></bal-input>
              </bal-form-col>
              @if(city(); as city) {
                @if(city.active) {
                  <bal-form-col>
                    <bal-input [formControl]="city.control"></bal-input>
                  </bal-form-col>
                }
              }
            </bal-form-grid>
          </bal-field-control>
        </bal-field>
        }
      }
    }

    <!-- <bal-form-grid>
      @if(postalCode(); as postalCode) { @if(postalCode.active) {
      <bal-form-col> </bal-form-col>
      } } @if(city(); as city) { @if(city.active) {
      <bal-form-col>
        <bal-field [disabled]="city.disabled">
          <bal-field-label>{{ city.label }}</bal-field-label>
          <bal-field-control>
            <bal-input [formControl]="city.control"></bal-input>
          </bal-field-control>
        </bal-field>
      </bal-form-col>
      } }
    </bal-form-grid>
    } -->
    `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationComponent
  implements AttachToParentFormGroup<LocationModel>
{
  private readonly locationRepository = inject(LocationRepository);
  readonly controlContainer = inject(ControlContainer);
  readonly api = inject(LocationApiService);

  readonly label = input<string>('Location');
  readonly model = input<LocationModel>(createLocationModel());
  readonly modelChanged = output<LocationModel>();

  readonly formFields = signal(new Map<LocationModelKeys, FormFieldControl>());
  readonly postalCode = computed(() => this.formFields().get('postalCode'));
  readonly city = computed(() => this.formFields().get('city'));

  constructor() {
    effect(
      (onCleanup) => {
        const cleanUp = attachToParentFormGroup(this);
        onCleanup(() => cleanUp());
      },
      { allowSignalWrites: true }
    );
  }

  formChanged = (field?: FormFieldControl) => {
    const newModel = this.toModel();

    if (field && field.name === 'postalCode' && field.control.valid) {
      this.updateCity(field.control.value);
    }

    this.locationRepository.update(newModel);
    this.modelChanged.emit(newModel);
  };

  async updateCity(postalCode: string) {
    const response = await firstValueFrom(this.api.findCities(postalCode));
    this.formFields().get('city')?.control.setValue(response[0]);
  }

  toModel = (): LocationModel => {
    return produce({ ...this.model() }, (draft) => {
      if (draft.postalCode) {
        draft.postalCode.initialValue =
          this.formFields().get('postalCode')?.control.value || undefined;
      }
      if (draft.city) {
        draft.city.initialValue =
          this.formFields().get('city')?.control.value || undefined;
      }
    });
  };
}
