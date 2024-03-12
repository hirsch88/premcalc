/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalNotification } from '@baloise/ds-angular';

@Component({
  selector: 'lib-insurance-taker',
  standalone: true,
  imports: [CommonModule, BalNotification],
  template: `<bal-notification>insurance-taker works!</bal-notification>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsuranceTakerComponent {
  /**
   * Lastname gugus adsf
   */
  @Input() name: string = '';
  /**
   * Firstname gugus
    */
  @Input() fname: string = '';
}
