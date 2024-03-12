import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-insurance-taker',
  standalone: true,
  imports: [CommonModule],
  template: `<p>insurance-taker works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsuranceTakerComponent {}
