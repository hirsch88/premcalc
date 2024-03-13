import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import * as balIcons from '@baloise/ds-icons';
// import { action } from '@storybook/addon-actions';

import { InsuranceTakerDocComponent } from './insurance-taker.doc.component';
import { createFirstNameField, createLastNameField } from '../store/insurance-taker.model';
import { provideBaloiseDesignSystem } from '@baloise/ds-angular';
import { provideStore } from '@ngrx/store';
import { insuranceTakerReducer } from '../store/insurance-taker.reducer';

const meta: Meta<InsuranceTakerDocComponent> = {
  title: 'Lib/InsuranceTaker',
  component: InsuranceTakerDocComponent,
  excludeStories: /.*Data$/,
  tags: ['autodocs'],
  args: {
    debug: true,
    model: {
      ...createFirstNameField('John', { label: 'Vorname' }),
      ...createLastNameField('Doe', { label: 'Nachname' })
    },
  },
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

export const Default: Story = {};

export const OnlyLastName: Story = {
  args: {
    model: {
      ...createLastNameField('Smith')
    },
  },
};
