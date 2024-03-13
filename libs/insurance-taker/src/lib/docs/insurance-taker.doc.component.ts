import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BalTabsBundle } from '@baloise/ds-angular';
import { DocsDebugConsoleComponent } from '@premcalc/docs';
import { InsuranceTakerModel } from '../store/insurance-taker.model';
import { InsuranceTakerComponent } from '../insurance-taker.component';
import { InsuranceTakerRepository } from '../store/insurance-taker.repository';

/**
 * The **InsuranceTaker** `<lib-insurance-taker>` component gathers and validates **personal information from individuals seeking insurance**.
 * It includes a user interface for inputting details like name, contact info, identification, financial status,
 * and relevant personal history.
 *
 * ```ts
 * const model = {
 *  ...createFirstNameField('John', { label: 'Vorname' }),
 *  ...createLastNameField('Doe', { label: 'Nachname' }),
 * }
 * ```
 *
 * ```html
 * <lib-insurance-taker [model]="model"></lib-insurance-taker>
 * ```
 */
@Component({
  selector: 'lib-insurance-taker-doc',
  standalone: true,
  imports: [
    InsuranceTakerComponent,
    ReactiveFormsModule,
    CommonModule,
    BalTabsBundle,
    DocsDebugConsoleComponent,
  ],
  template: `
    <div [formGroup]="formGroup">
      @if (model) {
      <lib-insurance-taker [model]="model"></lib-insurance-taker>
      }
    </div>
    <docs-debug-console
      [model]="model"
      [debug]="debug"
      [formGroup]="formGroup"
      [store]="repo.get() | async"
    ></docs-debug-console>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsuranceTakerDocComponent {
  /**
   * @ignore
   */
  private readonly repo = inject(InsuranceTakerRepository);

  /**
   * @ignore
   */
  readonly formGroup = new FormGroup({});

  /**
   * The model of the insurance taker form.
   */
  @Input() model!: InsuranceTakerModel;

  /**
   * Enable debug console to see store, form and model values
   */
  @Input() debug = false;
}
