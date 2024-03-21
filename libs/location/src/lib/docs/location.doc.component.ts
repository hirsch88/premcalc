import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BalTabsBundle } from '@baloise/ds-angular';
import { DocsDebugConsoleComponent } from '@premcalc/docs';
import { LocationComponent } from '../location.component';
import { LocationModel } from '../location.model';
import { LocationRepository } from '../location.repository';
import { LocationApiService } from '../location.api';

type ApiResponse<TResult> = {
  id: string;
  jsonrpc: string;
  result: TResult;
};

type LocationResult = {
  cityName: string;
  canton: string;
};

/**
 * The **InsuranceTaker** `<lib-insurance-taker>` component gathers and validates **personal information from individuals seeking insurance**.
 * It includes a user interface for inputting details like name, contact info, identification, financial status,
 * and relevant personal history.
 *
 * ### Create From
 *
 * ```typescript
 * const model = {
 *  ...createFirstNameField('John', { label: 'Vorname' }),
 *  ...createLastNameField('Doe', { label: 'Nachname' }),
 * }
 * ```
 *
 * ```html
 * <lib-insurance-taker [model]="model"></lib-insurance-taker>
 * ```
 *
 * ### Collect or Update the store
 *
 * ```typescript
 * const insuranceTakerRepository = inject(InsuranceTakerRepository);
 *
 * insuranceTakerRepository.get()
 * insuranceTakerRepository.update()
 * ```
 *
 */
@Component({
  selector: 'lib-location-doc',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BalTabsBundle,
    LocationComponent,
    DocsDebugConsoleComponent,
  ],
  template: `
    <div [formGroup]="formGroup">
      @if (model) {
      <lib-location
        [model]="model"
        (modelChanged)="modelChanged.emit($event)"
      ></lib-location>
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
export class LocationDocComponent {
  /**
   * @ignore
   */
  readonly repo = inject(LocationRepository);

  /**
   * @ignore
   */
  readonly api = inject(LocationApiService);

  /**
   * @ignore
   */
  readonly formGroup = new FormGroup({});

  /**
   * The model of the insurance taker form.
   */
  @Input() model!: LocationModel;

  /**
   * Enable debug console to see store, form and model values
   */
  @Input() debug = false;

  /**
   * Define the api response
   */
  @Input() apiResponse!: ApiResponse<LocationResult[]>;

  /**
   * Emits changes to the form model
   */
  @Output() modelChanged = new EventEmitter<LocationModel>();
}
