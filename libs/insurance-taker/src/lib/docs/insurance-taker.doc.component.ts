import { ChangeDetectionStrategy, Component, Input, OnInit, inject, signal } from '@angular/core';
import { InsuranceTakerModel } from '../store/insurance-taker.model';
import { InsuranceTakerComponent } from '../insurance-taker.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InsuranceTakerRepository } from '../store/insurance-taker.repository';
import { DocFormComponent, debugFormControls } from '../lib';
import { BalTabsBundle } from '@baloise/ds-angular';

/**
 * The `InsuranceTaker` component gathers and validates **personal information from individuals seeking insurance**.
 * It includes a user interface for inputting details like name, contact info, identification, financial status,
 * and relevant personal history.
 *
 * ```ts
 * const model = {
 *  firstName: formField('John', {
 *    label: 'Vorname',
 *    name: "firstName",
 *    disabled: true,
 *    hide: false,
 *  }),
 *  lastName: formField('Doe', {
 *    label: 'Nachname',
 *    name: "lastName",
 *    disabled: false,
 *    hide: false,
 *  })
 * }
 * ```
 */
@Component({
  selector: 'lib-insurance-taker-doc',
  standalone: true,
  imports: [InsuranceTakerComponent, ReactiveFormsModule, CommonModule, BalTabsBundle],
  template: `
  <div [formGroup]="formGroup">
    @if (model) {
      <lib-insurance-taker [model]="model"></lib-insurance-taker>
    }
  </div>

  <div class="bg-grey-1 radius-normal shadow-small border-grey border-width-small">
    <h2 class="title text-large m-normal">Debug Console</h2>
    <bal-tabs fullwidth border expanded class="bg-primary-1">
      <bal-tab-item value="model" label="Model" class="bg-grey-2" icon="code">
        <pre class="text-x-small p-normal">{{ model | json }}</pre>
      </bal-tab-item>

      <bal-tab-item value="form" label="Form Controls" class="bg-grey-2" icon="document">
        <pre class="text-x-small p-normal">{{ controls() | json }}</pre>
      </bal-tab-item>

      <bal-tab-item value="store" label="Store" class="bg-grey-2" icon="web">
        <pre class="text-x-small p-normal">{{ repo.get() | async | json }}</pre>
      </bal-tab-item>
    </bal-tabs>
  </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsuranceTakerDocComponent implements OnInit, DocFormComponent {

  /**
  * @ignore
  */
  private readonly repo = inject(InsuranceTakerRepository)

  /**
  * @ignore
  */
  readonly controls = signal({})

  /**
  * @ignore
  */
  readonly formGroup = new FormGroup({})

  /**
  * @ignore
  */
  _model!: InsuranceTakerModel;
  get model(): InsuranceTakerModel {
    return this._model;
  }

  /**
   * InsuranceTaker model
   */
  @Input() set model(value: InsuranceTakerModel) {
    this._model = value;
    debugFormControls(this)
  }

  /**
  * @ignore
  */
  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(() => debugFormControls(this))
    this.formGroup.statusChanges.subscribe(() => debugFormControls(this))
    setTimeout(() => debugFormControls(this))
  }
}
