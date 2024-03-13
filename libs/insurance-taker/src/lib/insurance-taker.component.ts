import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BalFormBundle,
  BalFormGridBundle,
  BalNotification,
} from '@baloise/ds-angular';
import {
  ControlContainer,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  AttachToParentFormGroup,
  FormFieldControl,
  attachToParentFormGroup,
} from '@premcalc/forms';
import { produce } from 'immer';
import {
  InsuranceTakerModel,
  InsuranceTakerModelKeys,
  createInsuranceTakerModel,
} from './store/insurance-taker.model';
import { InsuranceTakerRepository } from './store/insurance-taker.repository';

@Component({
  selector: 'lib-insurance-taker',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BalNotification,
    BalFormBundle,
    ReactiveFormsModule,
    BalFormGridBundle,
    FormsModule,
  ],
  template: ` @if (model()) {
    <bal-form-grid>
      @if(firstName() && firstName().active) {
      <bal-form-col>
        <bal-field [disabled]="firstName().disabled">
          <bal-field-label>{{ firstName().label }}</bal-field-label>
          <bal-field-control>
            <bal-input [formControl]="firstName().control"></bal-input>
          </bal-field-control>
        </bal-field>
      </bal-form-col>
      } @if(lastName() && lastName().active) {
      <bal-form-col>
        <bal-field [disabled]="lastName().disabled">
          <bal-field-label>{{ lastName().label }}</bal-field-label>
          <bal-field-control>
            <bal-input [formControl]="lastName().control"></bal-input>
          </bal-field-control>
        </bal-field>
      </bal-form-col>
      }
    </bal-form-grid>
    }`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsuranceTakerComponent
  implements AttachToParentFormGroup<InsuranceTakerModel>
{
  private readonly insuranceTakerRepository = inject(InsuranceTakerRepository);
  readonly controlContainer = inject(ControlContainer);

  readonly formFields = signal(
    new Map<InsuranceTakerModelKeys, FormFieldControl>()
  );

  readonly model = input<InsuranceTakerModel>(createInsuranceTakerModel());
  readonly firstName = computed(() => this.formFields().get('firstName'));
  readonly lastName = computed(() => this.formFields().get('lastName'));

  constructor() {
    effect(
      (onCleanup) => {
        const cleanUp = attachToParentFormGroup(this);
        onCleanup(() => cleanUp());
      },
      { allowSignalWrites: true }
    );
  }

  formChanged = () => this.insuranceTakerRepository.update(this.toModel());

  toModel = (): InsuranceTakerModel => {
    return produce({ ...this.model() }, (draft) => {
      if (draft.firstName) {
        draft.firstName.value =
          this.formFields().get('firstName')?.control.value || undefined;
      }
      if (draft.lastName) {
        draft.lastName.value =
          this.formFields().get('lastName')?.control.value || undefined;
      }
    });
  };
}
