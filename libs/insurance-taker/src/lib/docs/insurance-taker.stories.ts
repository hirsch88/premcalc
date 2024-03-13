import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import * as balIcons from '@baloise/ds-icons';
// import { action } from '@storybook/addon-actions';

import { InsuranceTakerDocComponent } from './insurance-taker.doc.component';
import { InsuranceTakerModel } from '../store/insurance-taker.model';
import { provideBaloiseDesignSystem } from '@baloise/ds-angular';
import { provideStore } from '@ngrx/store';
import { insuranceTakerReducer } from '../store/insurance-taker.reducer';
import { formField } from '../lib';

const meta: Meta<InsuranceTakerDocComponent> = {
  title: 'Lib/InsuranceTaker',
  component: InsuranceTakerDocComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  render: (args: InsuranceTakerDocComponent) => ({
    applicationConfig: {
      providers: [
        provideBaloiseDesignSystem({
          defaults: {
            icons: balIcons
          }
        }),
        provideStore({
          insuranceTaker: insuranceTakerReducer
        }),
      ]
    },
    props: {
      ...args,
      // onPinTask: actionsData.onPinTask,
      // onArchiveTask: actionsData.onArchiveTask,
    },
    template: `<lib-insurance-taker-doc ${argsToTemplate(
      args
    )}></lib-insurance-taker-doc>`,
  }),
};

export default meta;
type Story = StoryObj<InsuranceTakerDocComponent>;

export const Default: Story = {
  args: {
    model: {
      firstName: formField('John', { label: 'Vorname', name: "firstName", disabled: true }),
      lastName: formField('Doe', { label: 'Nachname', name: "lastName", disabled: false })
    } as InsuranceTakerModel as never,
  },
};

export const OnlyLastName: Story = {
  args: {
    model: {
      firstName: formField('John', { label: 'Vorname', name: "firstName", hide: true }),
      lastName: formField('Doe', { label: 'Nachname', name: "lastName", disabled: false })
    } as InsuranceTakerModel as never,
  },
};
