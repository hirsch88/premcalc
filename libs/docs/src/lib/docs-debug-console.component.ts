import { ChangeDetectionStrategy, Component, OnInit, effect, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup } from '@angular/forms';

export type DocFormOutput = { [key: string]: { value: unknown, pristine: boolean, invalid: boolean, disabled: boolean } }

@Component({
  selector: 'docs-debug-console',
  standalone: true,
  imports: [CommonModule],
  template: `
  @if(debug()){
    <div class="bg-grey-1 radius-normal shadow-small border-grey border-width-small">
      <h2 class="title text-large m-normal">Debug Console</h2>
      <bal-tabs fullwidth border expanded class="bg-primary-1">
        <bal-tab-item value="model" label="Model" class="bg-grey-2" icon="code">
          <pre class="text-x-small p-normal">{{ model() | json }}</pre>
        </bal-tab-item>

        <bal-tab-item value="form" label="Form Controls" class="bg-grey-2" icon="document">
          <pre class="text-x-small p-normal">{{ controls() | json }}</pre>
        </bal-tab-item>

        <bal-tab-item value="store" label="Store" class="bg-grey-2" icon="web">
          <pre class="text-x-small p-normal">{{ store() | json }}</pre>
        </bal-tab-item>
      </bal-tabs>
    </div>
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsDebugConsoleComponent implements OnInit {
  readonly model = input({})
  readonly store = input({})
  readonly debug = input(false)
  readonly formGroup = input<FormGroup>()

  readonly controls = signal<DocFormOutput>({});

  constructor() {
    effect(() => {
      this.debugFormControls()
    }, { allowSignalWrites: true })
  }

  ngOnInit(): void {
    const fg = this.formGroup()
    if (this.debug() && fg) {
      fg.valueChanges.subscribe(() => this.debugFormControls())
      fg.statusChanges.subscribe(() => this.debugFormControls())
      setTimeout(() => this.debugFormControls())
    }
  }

  debugFormControls() {
    const fg = this.formGroup()
    if (fg) {
      const abstractControls: { [key: string]: AbstractControl<unknown, unknown> } = fg.controls
      const output: DocFormOutput = {}
      Object.keys(abstractControls).forEach(key => {
        output[key] = {
          value: abstractControls[key].value,
          pristine: abstractControls[key].pristine,
          invalid: abstractControls[key].invalid,
          disabled: abstractControls[key].disabled,
        }
      })
      this.controls.set(output)
    }
  }
}
