import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BalButton, BalHeading, BalLayoutBundle } from '@baloise/ds-angular';

@Component({
  standalone: true,
  imports: [RouterModule, BalLayoutBundle, BalHeading, BalButton],
  selector: 'premcalc-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'car';
}
