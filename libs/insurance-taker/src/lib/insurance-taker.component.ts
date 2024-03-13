import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalFormBundle, BalFormGridBundle, BalNotification } from '@baloise/ds-angular';
import { ControlContainer, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InsuranceTakerModel } from './store/insurance-taker.model';
import { AttachToParentFormGroup, FormFieldControl, attachToParentFormGroup, syncModelWithFormFields } from './lib';
import { InsuranceTakerRepository } from './store/insurance-taker.repository';
import { produce } from 'immer';

@Component({
  selector: 'lib-insurance-taker',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BalNotification, BalFormBundle, ReactiveFormsModule, BalFormGridBundle, FormsModule],
  template: `
  @if (model()) {
    <bal-form-grid>
      <bal-form-col>
      <bal-field [disabled]="firstName().disabled">
          <bal-field-label>{{ firstName().label }}</bal-field-label>
          <bal-field-control>
            <bal-input [formControl]="controls.firstName"></bal-input>
          </bal-field-control>
        </bal-field>
      </bal-form-col>
      <bal-form-col>
        <bal-field [disabled]="lastName().disabled">
        <bal-field-label>{{ lastName().label }}</bal-field-label>
          <bal-field-control>
            <bal-input [formControl]="controls.lastName"></bal-input>
          </bal-field-control>
        </bal-field>
      </bal-form-col>
    </bal-form-grid>
  }`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsuranceTakerComponent implements AttachToParentFormGroup<InsuranceTakerModel> {
  private readonly insuranceTakerRepository = inject(InsuranceTakerRepository)
  readonly controlContainer = inject(ControlContainer)

  readonly formFields = new Map<string, FormFieldControl>()
  readonly controls = {
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])
  }

  readonly model = input<InsuranceTakerModel>(new InsuranceTakerModel)
  readonly firstName = computed(() => this.model().firstName)
  readonly lastName = computed(() => this.model().lastName)

  constructor() {
    effect((onCleanup) => {
      syncModelWithFormFields(this)
      const cleanUp = attachToParentFormGroup(this)
      this.formChanged()
      onCleanup(() => cleanUp());
    }, { allowSignalWrites: true })
  }

  formChanged = () => this.insuranceTakerRepository.update(this.toModel())

  toModel = (): InsuranceTakerModel => {
    return produce({ ...this.model() }, draft => {
      draft.firstName.value = this.controls.firstName.value || undefined
      draft.lastName.value = this.controls.lastName.value || undefined
    })
  }

}
