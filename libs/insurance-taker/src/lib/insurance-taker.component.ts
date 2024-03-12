/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-insurance-taker',
  standalone: true,
  imports: [CommonModule],
  template: `<p>insurance-taker works! Bubu adsf</p>`,
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
